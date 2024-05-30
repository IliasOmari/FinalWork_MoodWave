import "./playlistpreview-modules.css";
import Booba from "../assets/booba-2.jpeg";
import { FaPlay, FaPause } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import BackButton from "../assets/backbutton.png";
import { BeatLoader } from "react-spinners";

import {
  Link,
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { millisecondsToMinutes } from "date-fns";
import { useRef, useState, useEffect } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Textarea } from "@mui/joy";
const PlaylistPreview = () => {
  const user = useLoaderData();
  const { name } = useParams();
  const [input, setInput] = useState("");
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const navigate = useNavigate();
  const changePlaylist = () => {
    if (!input) {
      return alert("Pleae fill in the missing field");
    }
    setIsLoading(true);
    fetch("https://finalwork-moodwave-api.onrender.com/playlist", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        newName: input.trim(),
        userId: user.uuid,
        filter: state,
        name:
          state == "AI"
            ? user.playlistAI.find((el) => el.name == name).name
            : user.playlist.find((el) => el.name == name).name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Saved") {
          navigate(`/playlist-preview/${input.trim()}`, { state: state });
          setOpen(false);
          setIsLoading(false);
          return;
        }
        alert(data.message);
        setIsLoading(false);
      });
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
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                width: "80%",
                height: "auto",
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
                backgroundColor: "#692e65",
                border: "none",
                color: "white",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <Typography
                component="h2"
                id="modal-title"
                level="h3"
                textColor="inherit"
                fontWeight="lg"
                textAlign={"center"}
                fontFamily={"Poppins"}
                color="white"
                mb={1}
              >
                New Playlist
              </Typography>

              <Typography
                id="modal-desc"
                textColor="white"
                fontFamily={"Poppins"}
                marginBottom={"20px"}
              >
                <p style={{ marginBottom: "10px" }}>Enter your playlist name</p>

                <Textarea
                  disabled={false}
                  minRows={1}
                  size="lg"
                  variant="soft"
                  onChange={(e) => setInput(e.target.value)}
                />
              </Typography>

              <div className="submit-button" onClick={() => changePlaylist()}>
                <button className="submit-post">
                  {isLoading ? <BeatLoader color="#ffff" /> : "Submit"}
                </button>
              </div>
            </Sheet>
          </Modal>
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
                <h2
                  style={{ textAlign: "center" }}
                  onClick={() => setOpen(true)}
                >
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
                <h2
                  style={{ textAlign: "center" }}
                  onClick={() => setOpen(true)}
                >
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
