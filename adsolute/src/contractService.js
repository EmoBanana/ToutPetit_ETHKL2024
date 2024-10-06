import { ethers } from "ethers";
import Adsolute from "./Adsolute.json"; // Adjust the path as necessary

const adsoluteAddress = "0x385FD75b07D5A95FD4194ae86ef0C45Af597d61B"; // Replace with your deployed contract address

let provider;
let signer;
let adsoluteContract;

export const initializeContract = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      adsoluteContract = new ethers.Contract(adsoluteAddress, Adsolute, signer);

      console.log("Contract initialized successfully");
    } catch (error) {
      console.error("Failed to initialize the contract:", error);
    }
  } else {
    console.error("Ethereum object not found, install MetaMask.");
  }
};

export const mintTokensForAd = async (userAddress, creatorAddress) => {
  if (!adsoluteContract) {
    await initializeContract();
  }
  try {
    const tx = await adsoluteContract.mintTokensForAd(
      userAddress,
      creatorAddress
    );
    await tx.wait();
    console.log("Tokens minted for user and creator");
  } catch (error) {
    console.error("Error minting tokens:", error);
    throw error;
  }
};

export const burnTokensForInteraction = async (userAddress) => {
  const tx = await adsoluteContract.burnTokensForInteraction(userAddress);
  await tx.wait();
  console.log("Tokens burned for interaction");
};

export const burnTokensForNFTPurchase = async (userAddress, tokenCost) => {
  const tx = await adsoluteContract.burnTokensForNFTPurchase(
    userAddress,
    tokenCost
  );
  await tx.wait();
  console.log("Tokens burned for NFT purchase");
};

export const stakeForCreator = async () => {
  const tx = await adsoluteContract.stakeForCreator();
  await tx.wait();
  console.log("Tokens staked for creator");
};

// Add more functions as needed to interact with your contract
