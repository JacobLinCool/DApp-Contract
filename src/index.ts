import { ethers } from "ethers";

export enum ContractStatus {
    Initialized,
    Connected,
}

export class Contract {
    public status: ContractStatus = ContractStatus.Initialized;
    public contract: ethers.Contract | null = null;
    public ethereum = window.ethereum || null;
    public provider: ethers.providers.BaseProvider;

    constructor(
        public address: string,
        public network: number,
        public abi: ethers.ContractInterface,
        provider: ethers.providers.BaseProvider | null = null,
    ) {
        this.provider = provider || ethers.getDefaultProvider(this.network);
        this.contract = new ethers.Contract(this.address, this.abi, this.provider);
    }

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
