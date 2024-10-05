import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import Popup from "./Popup"; // Import Popup component
import { useWallet } from "../WalletContext";
import "./VideoPage.css";

const VideoPage = () => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const adVideoRef = useRef(null);
  const { account } = useWallet();

  const [adCount] = useState(parseInt(localStorage.getItem("adCount")) || 0);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [adsPlayed, setAdsPlayed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupMode, setPopupMode] = useState("notification");
  const [confirmAction, setConfirmAction] = useState(null);

  const videoDetails = {
    1: {
      src: "/Video1.mp4",
      title:
        "[Insta-LOG] EP27 #YEJI #HONGKONG | ITZY 2ND WORLD TOUR 'BORN TO BE'",
      imgsrc: "/Creator1.jpg",
      creator: "ITZY✅",
    },
    2: {
      src: "/Video2.mp4",
      title:
        "[Insta-LOG] EP26 #YUNA #TAIPEI | ITZY 2ND WORLD TOUR 'BORN TO BE'",
      imgsrc: "/Creator1.jpg",
      creator: "ITZY✅",
    },
    3: {
      src: "/Video3.mp4",
      title:
        "[Insta-LOG] EP25 #CHAERYEONG #MANILA | ITZY 2ND WORLD TOUR 'BORN TO BE'",
      imgsrc: "/Creator1.jpg",
      creator: "ITZY✅",
    },
    4: {
      src: "/Video4.mp4",
      title:
        "[Insta-LOG] EP24 #RYUJIN #TORONTO | ITZY 2ND WORLD TOUR 'BORN TO BE'",
      imgsrc: "/Creator1.jpg",
      creator: "ITZY✅",
    },
    5: {
      src: "/Video5.mp4",
      title: "ITZY「Algorhythm」JK Teaser YEJI pop ver.",
      imgsrc: "/Creator2.jpg",
      creator: "ITZY JAPAN OFFICIAL✅",
    },
    6: {
      src: "/Video6.mp4",
      title: "ITZY「Algorhythm」JK Teaser YUNA pop ver.",
      imgsrc: "/Creator2.jpg",
      creator: "ITZY JAPAN OFFICIAL✅",
    },
    7: {
      src: "/Video7.mp4",
      title: "ITZY「Algorhythm」JK Teaser CHAERYEONG pop ver.",
      imgsrc: "/Creator2.jpg",
      creator: "ITZY JAPAN OFFICIAL✅",
    },
    8: {
      src: "/Video8.mp4",
      title: "ITZY「Algorhythm」JK Teaser RYUJIN pop ver.",
      imgsrc: "/Creator2.jpg",
      creator: "ITZY JAPAN OFFICIAL✅",
    },
    9: {
      src: "/Video9.mp4",
      title: "YUNA FANCAM | ITZY 2ND WORLD TOUR 'BORN TO BE'",
      imgsrc: "/Creator3.jpg",
      creator: "Wenn",
    },
  };

  const adVideos = useMemo(() => ["/Ads1.mp4", "/Ads2.mp4"], []);
  const videoDetail = videoDetails[id] || {};

  const playAd = useCallback(
    (index) => {
      if (index < adCount) {
        adVideoRef.current.src = adVideos[index];
        adVideoRef.current.play().catch((error) => {
          console.error("Ad playback error:", error);
        });
      }
    },
    [adCount, adVideos]
  );

  useEffect(() => {
    if (adCount === 0) {
      videoRef.current.src = videoDetail.src;
      videoRef.current.play().catch((error) => {
        console.error("Main video playback error:", error);
      });
    } else if (!adsPlayed) {
      playAd(currentAdIndex);
    }
  }, [adsPlayed, currentAdIndex, adCount, videoDetail.src, playAd]);

  const loadInteractionState = useCallback(() => {
    console.log("Loading interaction state for video:", id);
    const tokenData = JSON.parse(localStorage.getItem("walletTokenData")) || {};
    let userTokens = tokenData[account?.address] || {
      tokenCount: 0,
      likedVideos: [],
      dislikedVideos: [],
    };

    const newIsLiked = userTokens.likedVideos?.includes(id) || false;
    const newIsDisliked = userTokens.dislikedVideos?.includes(id) || false;
    const newIsSubscribed = tokenData.isSubscribed || false;

    console.log("Loaded state:", {
      isLiked: newIsLiked,
      isDisliked: newIsDisliked,
      isSubscribed: newIsSubscribed,
    });

    setIsLiked(newIsLiked);
    setIsDisliked(newIsDisliked);
    setIsSubscribed(newIsSubscribed);
  }, [id, account?.address]);

  useEffect(() => {
    if (account?.address) {
      loadInteractionState();
    }
  }, [account?.address, loadInteractionState]);

  const handleAdEnded = () => {
    const nextAdIndex = currentAdIndex + 1;
    if (nextAdIndex < adCount) {
      setCurrentAdIndex(nextAdIndex);
      playAd(nextAdIndex);
    } else {
      setAdsPlayed(true);
      videoRef.current.src = videoDetail.src;
      videoRef.current.play().catch((error) => {
        console.error("Main video playback error:", error);
      });

      if (account?.address) {
        updateTokenCount();
      }
    }
  };

  const updateTokenCount = async () => {
    if (!account) return;

    try {
      const response = await fetch("/api/mintTokensForAd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: account.address }),
      });

      if (!response.ok) {
        throw new Error("Failed to mint tokens");
      }

      const data = await response.json();
      console.log("Tokens minted", data.newTokenCount);
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  const updateTokenCountAfterInteraction = async (interactionType, add) => {
    if (!account) return false;

    try {
      const response = await fetch("/api/interaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: account.address,
          interactionType,
          add,
          videoId: id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update interaction");
      }

      const data = await response.json();
      console.log("Interaction successful. Tokens left:", data.newTokenCount);
      return true;
    } catch (error) {
      console.error("Error updating interaction:", error);
      confirmPopup("Failed to process interaction.", () => {});
      return false;
    }
  };

  const confirmPopup = (message, action, mode = "confirmation") => {
    setPopupMessage(message);
    setPopupMode(mode);
    setConfirmAction(() => action);
    setShowPopup(true);
  };

  const handlePopupConfirm = () => {
    if (confirmAction) confirmAction();
    setShowPopup(false);
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  const handleLike = () => {
    if (isLiked) {
      confirmPopup("Do you want to remove your Like from this video?", () => {
        updateTokenCountAfterInteraction(0, "likedVideos", false);
      });
    } else {
      confirmPopup("Do you want to Like this video for 1 Token?", () => {
        updateTokenCountAfterInteraction(1, "likedVideos", true);
      });
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      confirmPopup(
        "Do you want to remove your Dislike from this video?",
        () => {
          updateTokenCountAfterInteraction(0, "dislikedVideos", false);
        }
      );
    } else {
      confirmPopup("Do you want to Dislike this video for 1 Token?", () => {
        updateTokenCountAfterInteraction(1, "dislikedVideos", true);
      });
    }
  };

  const handleSubscribe = () => {
    if (id === "9") {
      if (isSubscribed) {
        confirmPopup(
          "You are already subscribed to ITZY.",
          () => {},
          "notification"
        );
      } else {
        confirmPopup(
          "Do you want to Subscribe to Wenn for 1000 Tokens?",
          () => {
            updateTokenCountAfterInteraction(1000, "isSubscribed", true);
          }
        );
      }
    } else {
      if (isSubscribed) {
        confirmPopup("Do you want to unsubscribe from ITZY?", () => {
          updateTokenCountAfterInteraction(1000, "isSubscribed", false);
        });
      } else {
        confirmPopup(
          "You are already subscribed to ITZY.",
          () => {},
          "notification"
        );
      }
    }
  };

  const handleMainVideoPlay = (e) => {
    if (!adsPlayed && adCount > 0) {
      e.preventDefault();
      playAd(currentAdIndex);
    }
  };

  return (
    <Nav>
      <div className="video-page">
        {videoDetail.src ? (
          <>
            {!adsPlayed && adCount > 0 && (
              <video
                ref={adVideoRef}
                onEnded={handleAdEnded}
                controls={false}
                style={{ width: "100%", height: "auto" }}
              >
                <source src={adVideos[currentAdIndex]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <video
              ref={videoRef}
              src={videoDetail.src}
              alt={videoDetail.title}
              controls
              onPlay={handleMainVideoPlay}
              style={{
                display: adsPlayed || adCount === 0 ? "block" : "none",
                width: "100%",
                height: "auto",
              }}
            >
              <source src={videoDetail.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h2>{videoDetail.title}</h2>
            <div className="videopage-actions">
              <div className="channel-info">
                <img
                  src={videoDetail.imgsrc}
                  alt="thumbnail"
                  className="creator"
                />
                <h1>{videoDetail.creator}</h1>
              </div>
              <div className="video-actions">
                <button onClick={handleLike}>
                  {isLiked ? "Liked" : "Like"}
                </button>
                <button onClick={handleDislike}>
                  {isDisliked ? "Undislike" : "Dislike"}
                </button>
                <button onClick={handleSubscribe}>
                  {id === "9"
                    ? isSubscribed
                      ? "Subscribed"
                      : "Subscribe"
                    : isSubscribed
                    ? "Subscribe"
                    : "Subscribed"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Video not found</p>
        )}
      </div>

      {showPopup && (
        <Popup
          mode={popupMode}
          message={popupMessage}
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupCancel}
          onClose={() => setShowPopup(false)}
        />
      )}
    </Nav>
  );
};

export default VideoPage;
