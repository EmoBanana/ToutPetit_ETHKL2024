import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Upload from "./Upload"; // Import the Upload component
import "./YourVideo.css";

const YourVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isFromUpload = location.state?.fromUpload || false;

  const handleVideoClick = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <div>
      <Nav>
        {isFromUpload ? (
          <Upload />
        ) : (
          <div className="yourvideo-content">
            <div className="yourvideo-row">
              <div className="yourvideo" onClick={() => handleVideoClick(9)}>
                <img src="/Video9.jpg" alt="Video9" />
                <div className="yourvideo-title-container">
                  <img src="/Creator3.jpg" alt="Creator3" className="creator" />
                  <div className="yourvideo-title-container-text">
                    <h1>YUNA FANCAM | ITZY 2ND WORLD TOUR 'BORN TO BE'</h1>
                    <h2>Wenn</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Nav>
    </div>
  );
};

export default YourVideo;
