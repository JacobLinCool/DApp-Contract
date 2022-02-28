# DApp-Contract

Smart contract ease of use.

[NPM](https://www.npmjs.com/package/dapp-contract)

```bash
npm i dapp-contract
// or
yarn add dapp-contract
// or
pnpm i dapp-contract
```

## Usage

```js
import Contract from "dapp-contract";
import abi from "./abi";

const config = {
    /** The smart contract address */
    ADDRESS: "0x3D0b2d43Bc4249357b54ca917BE56D5ABf04d1C0",
    /** The blockchain Network ID */
    NETWORK: 4,
};

const contract new Contract(config.ADDRESS, config.NETWORK, abi);

contract.contract // ethers contract (provider)

await contract.connect(); // connect to metamask

contract.contract // ethers contract (signer)
```
