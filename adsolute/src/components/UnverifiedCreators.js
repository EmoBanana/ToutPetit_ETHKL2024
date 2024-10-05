import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import "./YourVideo.css";

const UnverifiedCreators = () => {
  const navigate = useNavigate();

  const handleVideoClick = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <Nav>
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
    </Nav>
  );
};

export default UnverifiedCreators;
