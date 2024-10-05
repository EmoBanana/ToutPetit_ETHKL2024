const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Adsolute = await hre.ethers.getContractFactory("Adsolute");
  const adsTokenAddress = "0xEB07f3f1b2583BD74E33711512cDb74E4aFa2b03"; // Your deployed token address
  const adsolute = await Adsolute.deploy(adsTokenAddress);

  // Wait for the deployment to be confirmed
  await adsolute.deployTransaction.wait();

  console.log("Adsolute contract deployed to:", adsolute.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
