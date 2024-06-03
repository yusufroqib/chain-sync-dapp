import { ethers } from 'hardhat';

async function main() {
  const supplyChain = await ethers.deployContract('SupplyChain');

  await supplyChain.waitForDeployment();

  // console.log(supplyChain)

  console.log('Contract Deployed at ' + supplyChain.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// CA: 0x38DcAEeb7c2090E575732d5DA5aa883B48e71c30

//CELO ALFAJORES: 0xe1CB270f0C7C82dA9E819A4cC2bd43861F550C4F

// Celo Mainnet: 0x2c13E255Ae105ff262A7eD47040D1D7bB3f837Ed