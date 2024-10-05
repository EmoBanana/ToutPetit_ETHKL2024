import React, { useState, useEffect } from "react";
import { useWallet } from "../WalletContext";

const WalletConnect = ({ onConnect }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const { setWalletAddress, disconnectWallet } = useWallet();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
      disconnectWallet();
      setWalletConnected(false);
    } else {
      setWalletAddress(accounts[0]);
      setWalletConnected(true);
      onConnect();
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        handleAccountsChanged(accounts);
      } catch (error) {
        if (error.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(error);
        }
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setWalletConnected(false);
    console.log("Wallet disconnected");
  };

  return (
    <div>
      <button onClick={connectWallet} className="connect-button">
        Connect Wallet
      </button>
      {walletConnected && (
        <div>
          <button onClick={handleDisconnect} className="connect-button">
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
