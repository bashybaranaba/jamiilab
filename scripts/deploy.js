const hre = require("hardhat");

async function main() {
  const CitizenScienceRewards = await hre.ethers.getContractFactory(
    "CitizenScienceRewards"
  );
  const contract = await CitizenScienceRewards.deploy();
  await contract.deployed();
  console.log("CitizenScienceRewards contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
