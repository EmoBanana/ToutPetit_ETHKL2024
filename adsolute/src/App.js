import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useWallet } from "./WalletContext";

import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import VideoPage from "./components/VideoPage";
import Marketplace from "./components/MarketPlace";
import UnverifiedCreators from "./components/UnverifiedCreators";
import YourVideo from "./components/YourVideo";
import Liked from "./components/Liked";

function App() {
  const { walletAddress } = useWallet();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/unverified" element={<UnverifiedCreators />} />
        <Route path={`/channel/${walletAddress}`} element={<YourVideo />} />
        <Route path="/liked" element={<Liked />} />
      </Routes>
    </Router>
  );
}

export default App;
