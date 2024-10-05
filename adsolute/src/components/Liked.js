import React from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import "./Liked.css";

const Liked = () => {
  const navigate = useNavigate();

  const handleVideoClick = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <Nav>
      <div className="liked-content">
        <div className="liked-row">
          <div className="liked" onClick={() => handleVideoClick(1)}>
            <img src="/Video1.jpg" alt="Video1" />
            <div className="liked-title-container">
              <img src="/Creator1.jpg" alt="Creator1" className="creator" />
              <div className="liked-title-container-text">
                <h1>
                  [Insta-LOG] EP27 #YEJI #HONGKONG | ITZY 2ND WORLD TOUR 'BORN
                  TO BE'
                </h1>
                <h2>ITZY✅</h2>
              </div>
            </div>
          </div>
          <div className="liked" onClick={() => handleVideoClick(2)}>
            <img src="/Video2.jpg" alt="Video2" />
            <div className="liked-title-container">
              <img src="/Creator1.jpg" alt="Creator1" className="creator" />
              <div className="liked-title-container-text">
                <h1>
                  [Insta-LOG] EP26 #YUNA #TAIPEI | ITZY 2ND WORLD TOUR 'BORN TO
                  BE'
                </h1>
                <h2>ITZY✅</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default Liked;
