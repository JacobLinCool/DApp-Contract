import { ethers } from "ethers";

/**
 * The status of a contract.
 */
export enum ContractStatus {
    /** The methods do not require a signature are ready to be called. */
    Initialized,
    /** All contract methods are ready to be called. */
    Connected,
}

/**
 * A class that represents a contract.
 */
export class Contract {
    /** The status of the Contract instance. */
    public status: ContractStatus = ContractStatus.Initialized;
    /**
     * The ethers contract instance.
     * Created with provider before calling `connect()`,
     * and re-created with signer after calling `connect()`.
     */
    public contract: ethers.Contract | null = null;
    /**  The injected ethereum object */
    public ethereum = window.ethereum || null;
    /** The provider used to connect to the ethereum network before calling `connect()`. */
    public provider: ethers.providers.BaseProvider;

    /**
     *
     * @param address The address of the contract.
     * @param network The network id of the network that contract is deployed on.
     * @param abi The ABI of the contract.
     * @param provider The provider used to connect to the ethereum network before calling `connect()`.
     */
    constructor(
        public address: string,
        public network: number,
        public abi: ethers.ContractInterface,
        provider: ethers.providers.BaseProvider | null = null,
    ) {
        this.provider = provider || ethers.getDefaultProvider(this.network);
        this.contract = new ethers.Contract(this.address, this.abi, this.provider);
    }

    /**
     * Connect to Metamask, and replace the contract instance with the signer if successful.
     */
    public async connect(): Promise<void> {
        if (this.status >= ContractStatus.Connected) {
            return;
        }

        if (this.ethereum?.request) {
            await this.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(this.ethereum);
            const signer = provider.getSigner();
            this.contract = new ethers.Contract(this.address, this.abi, signer);
            this.status = ContractStatus.Connected;
        }
    }
}

export default Contract;

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ethereum?: ethers.providers.ExternalProvider;
    }
}
