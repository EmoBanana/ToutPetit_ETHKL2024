import React from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleVideoClick = (id) => {
    navigate(`/video/${id}`);
  };

  return (
    <Nav>
      <div className="home-content">
        <div className="video-row">
          <div className="video" onClick={() => handleVideoClick(1)}>
            <img src="/Video1.jpg" alt="Video1" />
            <div className="title-container">
              <img src="/Creator1.jpg" alt="Creator1" className="creator" />
              <div className="title-container-text">
                <h1>
                  [Insta-LOG] EP27 #YEJI #HONGKONG | ITZY 2ND WORLD TOUR 'BORN
                  TO BE'
                </h1>
                <h2>ITZY✅</h2>
              </div>
            </div>
          </div>
          <div className="video" onClick={() => handleVideoClick(2)}>
            <img src="/Video2.jpg" alt="Video2" />
            <div className="title-container">
              <img src="/Creator1.jpg" alt="Creator1" className="creator" />
              <div className="title-container-text">
                <h1>
                  [Insta-LOG] EP26 #YUNA #TAIPEI | ITZY 2ND WORLD TOUR 'BORN TO
                  BE'
                </h1>
                <h2>ITZY✅</h2>
              </div>
            </div>
          </div>
          <div className="video" onClick={() => handleVideoClick(3)}>
            <img src="/Video3.jpg" alt="Video3" />
            <div className="title-container">
              <img src="/Creator1.jpg" alt="Creator1" className="creator" />
              <div className="title-container-text">
                <h1>
                  [Insta-LOG] EP25 #CHAERYEONG #MANILA | ITZY 2ND WORLD TOUR
                  'BORN TO BE'
                </h1>
                <h2>ITZY✅</h2>
              </div>
            </div>
          </div>
          <div className="video" onClick={() => handleVideoClick(4)}>
            <img src="/Video4.jpg" alt="Video4" />
            <div className="title-container">
              <img src="/Creator1.jpg" alt="Creator1" className="creator" />
              <div className="title-container-text">
                <h1>
                  [Insta-LOG] EP24 #RYUJIN #TORONTO | ITZY 2ND WORLD TOUR 'BORN
                  TO BE'
                </h1>
                <h2>ITZY✅</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="video-row">
          <div className="video" onClick={() => handleVideoClick(5)}>
            <img src="/Video5.jpg" alt="Video5" />
            <div className="title-container">
              <img src="/Creator2.jpg" alt="Creator1" className="creator" />
              <div className="title-container-text">
                <h1>ITZY「Algorhythm」JK Teaser YEJI pop ver.</h1>
                <h2>ITZY JAPAN OFFICIAL✅</h2>
              </div>
            </div>
          </div>
          <div className="video" onClick={() => handleVideoClick(6)}>
            <img src="/Video6.jpg" alt="Video6" />
            <div className="title-container">
              <img src="/Creator2.jpg" alt="Creator1" className="creator" />
              <div className="title-container-text">
                <h1>ITZY「Algorhythm」JK Teaser YUNA pop ver.</h1>
                <h2>ITZY JAPAN OFFICIAL✅</h2>
              </div>
            </div>
          </div>
          <div className="video" onClick={() => handleVideoClick(7)}>
            <img src="/Video7.jpg" alt="Video7" />
            <div className="title-container">
              <img src="/Creator2.jpg" alt="Creator1" className="creator" />
              <div className="title-container-text">
                <h1>ITZY「Algorhythm」JK Teaser CHAERYEONG pop ver.</h1>
                <h2>ITZY JAPAN OFFICIAL✅</h2>
              </div>
            </div>
          </div>
          <div className="video" onClick={() => handleVideoClick(8)}>
            <img src="/Video8.jpg" alt="Video8" />
            <div className="title-container">
              <img src="/Creator2.jpg" alt="Creator1" className="creator" />
              <div className="title-container-text">
                <h1>ITZY「Algorhythm」JK Teaser RYUJIN pop ver.</h1>
                <h2>ITZY JAPAN OFFICIAL✅</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default HomePage;
