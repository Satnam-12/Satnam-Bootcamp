import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("Drake", ["0x5EF6616f49CB6Ca5fd86d79460cF203AB357ae75"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});