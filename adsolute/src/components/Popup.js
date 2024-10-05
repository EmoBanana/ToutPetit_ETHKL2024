import React from "react";
import "./Popup.css";

const Popup = ({ mode, message, onConfirm, onCancel, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        {mode === "confirmation" && (
          <div className="popup-buttons">
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
          </div>
        )}
        {mode === "notification" && (
          <div className="popup-buttons">
            <button onClick={onClose}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
