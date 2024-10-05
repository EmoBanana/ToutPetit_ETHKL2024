import React, { useState } from "react";
import Nav from "./Nav";
import Popup from "./Popup";
import { useWallet } from "../WalletContext";
import "./Marketplace.css";

const MarketPlace = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupMode, setPopupMode] = useState("notification");
  const { walletAddress } = useWallet();

  const handlePurchase = async (itemId, tokenCost) => {
    if (!walletAddress) {
      setPopupMessage("Wallet not connected.");
      setPopupMode("notification");
      setShowPopup(true);
      return;
    }

    try {
      const tokenData =
        JSON.parse(localStorage.getItem("walletTokenData")) || {};
      const walletTokenData = tokenData[walletAddress] || { tokenCount: 0 };

      if (walletTokenData.tokenCount < tokenCost) {
        setPopupMessage("Insufficient tokens to redeem this NFT.");
        setPopupMode("notification");
        setShowPopup(true);
        return;
      }

      walletTokenData.tokenCount -= tokenCost;
      tokenData[walletAddress] = walletTokenData;
      localStorage.setItem("walletTokenData", JSON.stringify(tokenData));

      setPopupMessage("You have successfully redeemed this NFT!");
      setPopupMode("notification");
      setShowPopup(true);
    } catch (error) {
      console.error("Error handling purchase:", error);
      setPopupMessage("Failed to redeem this NFT. Please try again.");
      setPopupMode("notification");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Nav>
      <div className="market-content">
        <div className="nft-row">
          <div className="nft">
            <img src="/Marketplace1.jpg" alt="nft1" />
            <div className="market-title-container">
              <div className="market-title-container-text">
                <h1>10% Off for TOKEN2049 Singapore Ticket</h1>
                <h2>30000 Tokens</h2>
                <button
                  className="redeem-button"
                  onClick={() => handlePurchase(1, 30000)}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
          <div className="nft">
            <img src="/Marketplace2.jpg" alt="nft2" />
            <div className="market-title-container">
              <div className="market-title-container-text">
                <h1>10% Off for Devcon Southeast Asia Ticket</h1>
                <h2>10000 Tokens</h2>
                <button
                  className="redeem-button"
                  onClick={() => handlePurchase(2, 10000)}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup mode={popupMode} message={popupMessage} onClose={closePopup} />
      )}
    </Nav>
  );
};

export default MarketPlace;
