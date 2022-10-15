const { ethers } = require("hardhat");
const { VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE } = require("../constants");
require("dotenv").config({ path: ".env" });

async function main() {
  const randomWinnerGame = await ethers.getContractFactory("RandomWinnerGame");

  const deployedRandomWinnerGameContract = await randomWinnerGame.deploy(
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH,
    FEE
  );

  await deployedRandomWinnerGameContract.deployed();

  console.log(
    "Verify Contract Address:",
    deployedRandomWinnerGameContract.address
  );

  console.log("Sleeping.....");

  await sleep(30000);

  await hre.run("verify:verify", {
    address: deployedRandomWinnerGameContract.address,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
