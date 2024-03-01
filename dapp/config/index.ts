import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xe541D317f761599b5B01Af140C438Dd301f308f3",
        abi as any,
        signer
    );
}