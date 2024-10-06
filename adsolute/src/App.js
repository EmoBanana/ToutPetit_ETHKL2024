import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useWallet } from "./WalletContext";
import { initializeContract } from "./contractService";

import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import VideoPage from "./components/VideoPage";
import Marketplace from "./components/MarketPlace";
import UnverifiedCreators from "./components/UnverifiedCreators";
import YourVideo from "./components/YourVideo";
import Liked from "./components/Liked";

const ProtectedRoute = ({ children }) => {
  const { walletAddress } = useWallet();
  return walletAddress ? children : <Navigate to="/" replace />;
};

const WalletConnectedRoute = ({ children }) => {
  const { walletAddress } = useWallet();
  return walletAddress ? <Navigate to="/home" replace /> : children;
};

function App() {
  const { walletAddress } = useWallet();

  useEffect(() => {
    if (walletAddress) {
      initializeContract()
        .then(() => console.log("Contract initialized successfully"))
        .catch((error) =>
          console.error("Failed to initialize contract:", error)
        );
    }
  }, [walletAddress]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <WalletConnectedRoute>
              <LandingPage />
            </WalletConnectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/video/:id"
          element={
            <ProtectedRoute>
              <VideoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/unverified"
          element={
            <ProtectedRoute>
              <UnverifiedCreators />
            </ProtectedRoute>
          }
        />
        <Route
          path="/channel/:address"
          element={
            <ProtectedRoute>
              <YourVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/liked"
          element={
            <ProtectedRoute>
              <Liked />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
