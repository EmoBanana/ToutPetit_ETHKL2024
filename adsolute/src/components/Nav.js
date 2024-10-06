import React, { useState, useEffect } from "react";
import { useWallet } from "../WalletContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = ({ children }) => {
  const { walletAddress, setWalletAddress } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);
  const [adMenuOpen, setAdMenuOpen] = useState(false);
  const [adCount, setAdCount] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedAdCount = localStorage.getItem("adCount");
    if (savedAdCount) {
      setAdCount(parseInt(savedAdCount, 10) || 0); // Ensure adCount is a number
    }

    if (walletAddress) {
      // Retrieve token count specific to the wallet address
      const tokenData =
        JSON.parse(localStorage.getItem("walletTokenData")) || {};
      const walletTokenData = tokenData[walletAddress] || {};

      // Ensure tokenCount is a number
      setTokenCount(walletTokenData.tokenCount || 0);
    }
  }, [walletAddress]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleAdMenu = () => {
    setAdMenuOpen(!adMenuOpen);
  };

  const handleDisconnect = async () => {
    setWalletAddress(null);
    setMenuOpen(false);
    navigate("/");
  };

  const handleSwitchWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setMenuOpen(false);
      } catch (error) {
        console.error("Failed to switch wallet:", error);
      }
    } else {
      console.error("MetaMask is not installed.");
    }
  };

  const handleAdCountChange = (count) => {
    if (count !== adCount) {
      setAdCount(count);
      localStorage.setItem("adCount", count); // Save the selected ad count
      setAdMenuOpen(false);
    }
  };

  const currentPath = location.pathname;

  return (
    <div className="homepage">
      <header className="nav-bar">
        <div className="site-title" onClick={() => navigate("/home")}>
          Adsolute.
        </div>
        <div className="search-bar-container">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <h1 className="tokenCount">{Number(tokenCount)} Tokens</h1>{" "}
        {/* Ensure tokenCount is a number */}
        <button className="ads-button" onClick={toggleAdMenu}>
          Ads
        </button>
        {adMenuOpen && (
          <div className="ads-menu">
            <label>
              <input
                type="radio"
                name="adCount"
                value="0"
                checked={adCount === 0}
                onChange={() => handleAdCountChange(0)}
              />
              No Ads
            </label>
            <label>
              <input
                type="radio"
                name="adCount"
                value="1"
                checked={adCount === 1}
                onChange={() => handleAdCountChange(1)}
              />
              One Ad
            </label>
            <label>
              <input
                type="radio"
                name="adCount"
                value="2"
                checked={adCount === 2}
                onChange={() => handleAdCountChange(2)}
              />
              Two Ads
            </label>
          </div>
        )}
        <button
          className="upload-button"
          onClick={() =>
            navigate(`/channel/${walletAddress}`, {
              state: { fromUpload: true },
            })
          }
        >
          Upload
        </button>
        <div className="wallet-address-container">
          <button className="wallet-address" onClick={toggleMenu}>
            {walletAddress
              ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-4)}`
              : "Not Connected"}
          </button>
          {menuOpen && (
            <div className="wallet-menu">
              <button onClick={handleSwitchWallet}>Switch Wallet</button>
              <button onClick={handleDisconnect}>Disconnect</button>
            </div>
          )}
        </div>
      </header>
      <div className="main-content">
        <div className="side-bar">
          <button
            className={`side-bar-button ${
              currentPath === "/home" ? "active" : ""
            }`}
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          <button
            className={`side-bar-button ${
              currentPath === "/marketplace" ? "active" : ""
            }`}
            onClick={() => navigate("/marketplace")}
          >
            Marketplace
          </button>
          <div className="divider"></div>
          <button
            className={`side-bar-button ${
              currentPath === "/unverified" ? "active" : ""
            }`}
            onClick={() => navigate("/unverified")}
          >
            New Creators
          </button>
          <button className="side-bar-button">Subscriptions</button>
          <div className="divider"></div>
          <div className="side-bar-title">You</div>
          <button
            className={`side-bar-button ${
              currentPath === `/channel/${walletAddress}` ? "active" : ""
            }`}
            onClick={() => navigate(`/channel/${walletAddress}`)}
          >
            Your Videos
          </button>
          <button
            className={`side-bar-button ${
              currentPath === "/liked" ? "active" : ""
            }`}
            onClick={() => navigate("/liked")}
          >
            Liked Videos
          </button>
          <button className="side-bar-button">History</button>
          <div className="divider"></div>
          <div className="side-bar-title">Subscriptions</div>
          <button className="side-bar-button">ITZY</button>
          <button className="side-bar-button">ITZY JAPAN OFFICIAL</button>
          <div className="divider"></div>
          <button className="side-bar-button">Settings</button>
          <button className="side-bar-button">Help</button>
          <button className="side-bar-button">Send Feedback</button>
        </div>
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default Nav;
