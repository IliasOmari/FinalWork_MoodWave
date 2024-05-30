import "./playlistpreview-modules.css";
import Booba from "../assets/booba-2.jpeg";
import { FaPlay, FaPause } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import BackButton from "../assets/backbutton.png";
import {
  Link,
  Navigate,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router-dom";
import { millisecondsToMinutes } from "date-fns";
import { useRef, useState, useEffect } from "react";

const PlaylistPreview = () => {
  const user = useLoaderData();
  const { name } = useParams();
  const { state } = useLocation();
  const audioRef = useRef();
  const [audio, setAudio] = useState(null);
  const [selected, setSelected] = useState({});
  const handlePauseMusic = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current = undefined;
    setSelected({});
    setAudio(null);
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
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);
  useEffect(() => {
    if (audio) {
      audioRef.current.play();
      audioRef.current.loop = true;
    }
  }, [audio]);
  return (
    <div className="playlist-container">
      {!state ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <Link to={"/profile"}>
            <div className="back">
              <img src={BackButton} alt="backbutton" />
            </div>
          </Link>
          {state == "AI" ? (
            <div className="playlist">
              <div className="playlist-image">
                <img
                  src={
                    user.playlistAI.find((el) => el.name == name).playlist[0]
                      .album.images[0].url
                  }
                  alt=""
                />
                <h2 style={{ textAlign: "center" }}>
                  {user.playlistAI.find((el) => el.name == name).name}
                </h2>
                <p>
                  {
                    user.playlistAI.find((el) => el.name == name).playlist
                      .length
                  }{" "}
                  tracks -{" "}
                  {millisecondsToMinutes(
                    user.playlistAI
                      .find((el) => el.name == name)
                      .playlist.reduce(
                        (acc, value) => acc + value.duration_ms,
                        0
                      )
                  )}{" "}
                  minutes
                </p>
              </div>

              {user.playlistAI
                .find((el) => el.name == name)
                .playlist.map((el) => (
                  <div
                    key={el.id}
                    className="music-list"
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <img src={el.album.images[0].url} alt="" />
                      <p
                        style={{
                          color: selected.name == el.name ? "#d43b84" : "white",
                        }}
                      >
                        {el.name}
                      </p>
                    </div>
                    {selected.name === el.name ? (
                      <FaPause
                        size={25}
                        color="white"
                        alignmentBaseline="center"
                        onClick={handlePauseMusic}
                      />
                    ) : (
                      <FaPlay
                        size={25}
                        color="white"
                        alignmentBaseline="center"
                        onClick={() => handlePlayMusic(el)}
                      />
                    )}{" "}
                  </div>
                ))}
            </div>
          ) : (
            <div className="playlist">
              <div className="playlist-image">
                <img
                  src={
                    user.playlist.find((el) => el.name == name).playlist[0]
                      .album.images[0].url
                  }
                  alt=""
                />
                <h2 style={{ textAlign: "center" }}>
                  {user.playlist.find((el) => el.name == name).name}
                </h2>
                <p>
                  {user.playlist.find((el) => el.name == name).playlist.length}{" "}
                  tracks -{" "}
                  {millisecondsToMinutes(
                    user.playlist
                      .find((el) => el.name == name)
                      .playlist.reduce(
                        (acc, value) => acc + value.duration_ms,
                        0
                      )
                  )}{" "}
                  minutes
                </p>
              </div>

              {user.playlist
                .find((el) => el.name == name)
                .playlist.map((el) => (
                  <div
                    key={el.id}
                    className="music-list"
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <img src={el.album.images[0].url} alt="" />
                      <p
                        style={{
                          color: selected.name == el.name ? "#d43b84" : "white",
                        }}
                      >
                        {el.name}
                      </p>
                    </div>
                    {selected.name === el.name ? (
                      <FaPause
                        size={25}
                        color="white"
                        alignmentBaseline="center"
                        onClick={handlePauseMusic}
                      />
                    ) : (
                      <FaPlay
                        size={25}
                        color="white"
                        alignmentBaseline="center"
                        onClick={() => handlePlayMusic(el)}
                      />
                    )}{" "}
                  </div>
                ))}
            </div>
          )}

          <Navbar />
        </>
      )}
    </div>
  );
};

export default PlaylistPreview;
