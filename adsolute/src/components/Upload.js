import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../WalletContext";
import Popup from "./Popup"; // Import the Popup component
import "./Upload.css";

const Upload = () => {
  const { walletAddress } = useWallet();
  const [uploadShowPopup, setUploadShowPopup] = useState(true); // State to control popup visibility
  const [uploadChannelLogo, setUploadChannelLogo] = useState(null); // State for channel logo
  const [uploadChannelName, setUploadChannelName] = useState(""); // State for channel name
  const [uploadVideoTitle, setUploadVideoTitle] = useState(""); // State for video title
  const [uploadThumbnailFile, setUploadThumbnailFile] = useState(null); // State for thumbnail file
  const [uploadVideoFile, setUploadVideoFile] = useState(null); // State for video file
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // State for confirmation popup
  const [showPopup, setShowPopup] = useState(false); // State to control notification popup
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [popupMode, setPopupMode] = useState(""); // State for popup mode

  const tokenCost = 20; // Cost to stake tokens for uploading

  const navigate = useNavigate(); // Use the navigate hook

  const handleUploadPopupConfirm = () => {
    if (
      uploadChannelName &&
      uploadVideoTitle &&
      uploadVideoFile &&
      uploadThumbnailFile &&
      uploadChannelLogo
    ) {
      setShowConfirmationPopup(true); // Show confirmation popup
    } else {
      alert("Please fill out all fields before proceeding."); // Alert if any field is missing
    }
  };

  const handleConfirmStake = () => {
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
        setPopupMessage("Insufficient tokens to proceed.");
        setPopupMode("notification");
        setShowPopup(true);
        return;
      }

      // Deduct tokens
      walletTokenData.tokenCount -= tokenCost;
      tokenData[walletAddress] = walletTokenData;
      localStorage.setItem("walletTokenData", JSON.stringify(tokenData));

      setPopupMessage("You have successfully uploaded your video!");
      setPopupMode("notification");
      setShowPopup(true);

      setUploadShowPopup(false); // Hide the upload popup after confirmation

      // Navigate to YourVideo with fromUpload set to true
      navigate(`/channel/${walletAddress}`, { state: { fromUpload: true } });
    } catch (error) {
      console.error("Error handling upload:", error);
      setPopupMessage("Failed to upload. Please try again.");
      setPopupMode("notification");
      setShowPopup(true);
    }
    setShowConfirmationPopup(false); // Hide the confirmation popup
  };

  const handleCancelStake = () => {
    setShowConfirmationPopup(false); // Hide the confirmation popup if the user cancels
  };

  const handleUploadPopupCancel = () => {
    setUploadShowPopup(false); // Hide the popup on cancel

    // Navigate to YourVideo with fromUpload set to true
    navigate(`/channel/${walletAddress}`, { state: { fromUpload: true } });
  };

  const handleUploadLogoChange = (e) => {
    setUploadChannelLogo(e.target.files[0]); // Set channel logo
  };

  const handleUploadThumbnailChange = (e) => {
    setUploadThumbnailFile(e.target.files[0]); // Set video thumbnail
  };

  const handleUploadVideoChange = (e) => {
    setUploadVideoFile(e.target.files[0]); // Set video file
  };

  const hiddenFileInput1 = useRef(null);
  const hiddenFileInput2 = useRef(null);
  const hiddenFileInput3 = useRef(null);

  const handleClick1 = () => {
    hiddenFileInput1.current.click();
  };

  const handleClick2 = () => {
    hiddenFileInput2.current.click();
  };

  const handleClick3 = () => {
    hiddenFileInput3.current.click();
  };

  return (
    <div className="upload-page">
      {uploadShowPopup && (
        <div className="upload-popup-overlay">
          <div className="upload-popup-content">
            <p>Please provide the following details to upload your video</p>
            <div className="upload-form">
              <div className="form-input">
                <label>Channel Logo:</label>
                <button className="customButton" onClick={handleClick1}>
                  Choose File
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadLogoChange}
                  ref={hiddenFileInput1}
                />
              </div>

              <div className="form-input">
                <label>Channel Name:</label>
                <input
                  type="text"
                  value={uploadChannelName}
                  onChange={(e) => setUploadChannelName(e.target.value)}
                />
              </div>

              <div className="form-input">
                <label>Video Title:</label>
                <input
                  type="text"
                  value={uploadVideoTitle}
                  onChange={(e) => setUploadVideoTitle(e.target.value)}
                />
              </div>

              <div className="form-input">
                <label>Video Thumbnail:</label>
                <button className="customButton" onClick={handleClick2}>
                  Choose File
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadThumbnailChange}
                  ref={hiddenFileInput2}
                />
              </div>

              <div className="form-input">
                <label>Upload Video:</label>
                <button className="customButton" onClick={handleClick3}>
                  Choose File
                </button>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleUploadVideoChange}
                  ref={hiddenFileInput3}
                />
              </div>
            </div>
            <div className="upload-popup-buttons">
              <button onClick={handleUploadPopupConfirm}>Confirm</button>
              <button onClick={handleUploadPopupCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showConfirmationPopup && (
        <Popup
          mode="confirmation"
          message="You will stake 20 tokens for your first video. Do you want to continue?"
          onConfirm={handleConfirmStake}
          onCancel={handleCancelStake}
        />
      )}

      {showPopup && (
        <Popup
          mode={popupMode}
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Upload;
