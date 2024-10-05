const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Adsolute Contract", function () {
  let adsolute;
  let owner;
  let addr1;

  beforeEach(async function () {
    const Adsolute = await ethers.getContractFactory("Adsolute");
    [owner, addr1] = await ethers.getSigners();
    adsolute = await Adsolute.deploy(
      "0xEB07f3f1b2583BD74E33711512cDb74E4aFa2b03"
    );
    await adsolute.waitForDeployment(); // Ensure this line is present
  });

  it("Should mint tokens correctly", async function () {
    await adsolute.mintTokensForAd(0x60cb041a232b7ad0966e6ec46728078461242803); // Assuming mint function takes address and amount
    const balance = await adsolute.balanceOf(addr1.address);
    expect(balance).to.equal(100);
  });
});
