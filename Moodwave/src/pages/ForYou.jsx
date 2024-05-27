import "./foryou-modules.css";
import Navbar from "../components/Navbar";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FaPause } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
const ForYou = () => {
  const audioRef = useRef();
  const user = useLoaderData();
  const [tracks, setTracks] = useState([]);
  const genres = user.genres.map((el) => el.value).join("%2C");
  const [selected, setSelected] = useState({});
  const [isPlaying, setIsplaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const navigate = useNavigate();
  const handlePauseMusic = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current = undefined;
    setSelected({});
    setAudio(null);
    setIsplaying(false);
  };
  const handlePlayMusic = (data) => {
    if (selected?.preview_url) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setAudio(new Audio(data.preview_url));
    audioRef.current = new Audio(data.preview_url);
    audioRef.current.play();
    setSelected(data);
    setIsplaying(true);
  };

  const like = () => {
    fetch("https://finalwork-moodwave-api.onrender.com/likeMusic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ music: selected, userId: user.uuid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Bad Request") return alert(data.message);
        navigate("/for-you");
      });
  };

  const unlike = () => {
    fetch("https://finalwork-moodwave-api.onrender.com/likeMusic", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ musicId: selected.id, userId: user.uuid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Bad Request") return alert(data.message);
        navigate("/for-you");
      });
  };
  useEffect(() => {
    if (audio) {
      audioRef.current.play();
      audioRef.current.loop = true;
    }
  }, [audio]);

  useEffect(() => {
    async function getForYou() {
      const url = `https://spotify23.p.rapidapi.com/recommendations/?limit=50&seed_genres=${genres}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "90085ecb97msh4acac5beff97718p1de40fjsn1f2f70e82263",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };
      const response = await fetch(url, options);
      const result = await response.json();
      setTracks(result.tracks.filter((el) => el.preview_url));
    }

    getForYou();
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ ease: "easeInOut" }}
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            position: "fixed",
            zIndex: "3",
            bottom: "150px",
          }}
        >
          <div
            className="playbanner"
            style={{
              width: "80%",
              backgroundColor: "#3D1D3B",
              borderRadius: "10px",
              padding: "20px",
              color: "white",
              overflowX: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <motion.img
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10 }}
                  src={selected?.album?.images[0]?.url}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <p>{selected?.name}</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {selected?.artists?.map((art, index) => (
                      <p key={index}>{art.name}</p>
                    ))}
                  </div>
                </div>
              </div>
              {user.music.length == 0 ? (
                <FaRegHeart size={30} color="white" onClick={() => like()} />
              ) : !user.music.find((like) => like.id == selected.id) ? (
                <FaRegHeart size={30} color="white" onClick={() => like()} />
              ) : (
                <FaHeart size={30} onClick={() => unlike()} />
              )}{" "}
            </div>
          </div>
        </motion.div>
      )}

      <div className="for-you-container">
        <div className="intro-text">
          <h2>Hi {user.username} 👋🏻</h2>
          <p>Discover some songs here!</p>
        </div>
        <div className="for-you">
          {/* <div className="searchbar-music">
            <Avatar>IO</Avatar>
            <input
              type="text"
              id="searchbar"
              placeholder="Share everything you want."
            />
          </div> */}
          {/* <div className="popular">
            <h2>Popular Now</h2>
            <Caroussel />
          </div> */}
          <div className="recently-played">
            <h2>Selected for you</h2>
            {tracks.map((track) => (
              <div
                key={track.id}
                className="selected-playlist"
                style={{
                  marginBottom: "30px",
                  color: "white",
                  overflowX: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="music-list-text"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={track.album.images[0].url}
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div>
                      <p
                        style={{
                          fontWeight: "bold",
                          color:
                            selected.name == track.name ? "#d43b84" : "white",
                        }}
                      >
                        {track.name}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                          gap: "5px",
                        }}
                      >
                        {track.artists.map((art, index) => (
                          <p key={index}>{art.name}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selected.name === track.name ? (
                    <FaPause
                      size={20}
                      color="white"
                      alignmentBaseline="center"
                      onClick={handlePauseMusic}
                    />
                  ) : (
                    <FaPlay
                      size={20}
                      color="white"
                      alignmentBaseline="center"
                      onClick={() => handlePlayMusic(track)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default ForYou;
