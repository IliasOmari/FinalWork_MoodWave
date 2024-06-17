import { Sidebar } from "primereact/sidebar";
import Navbar from "../components/Navbar";
import "./generate-modules.css";
import { useEffect, useId, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaPlay, FaPause } from "react-icons/fa6";
import { color } from "framer-motion";
import { BeatLoader } from "react-spinners";
import { Navigate, useLoaderData } from "react-router-dom";
import Popup from "../components/Popup";
import toast, { Toaster } from "react-hot-toast";

const Generate = () => {
  const audioRef = useRef();
  const [audio, setAudio] = useState(null);
  const [selected, setSelected] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
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
  const [text, setText] = useState("");
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  async function API() {
    setIsGenerating(true);
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${text}, give 25 songs that exists on spotify and its spotify ID directly, by following this pattern as output for every given track: Track name - spotifyId.`,
          },
        ],
      }),
    });
    const data = await result.json();
    const textArray = data.choices[0].message.content.split("\n").map((el) => {
      const index = el.indexOf("-");
      return el.slice(index + 1).trim();
    });

    setPlaylist([]);
    textArray.forEach(async (el) => {
      const url = `https://spotify23.p.rapidapi.com/tracks/?ids=${el}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "4f99ecb18bmsh86467b9c588a99dp17658djsn47889005ac80",
          "x-rapidapi-host": "spotify23.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.tracks[0] == null) return;
        setPlaylist((prev) => [...prev, result.tracks[0]]);
      } catch (error) {
        console.error(error);
      }
    });
    setIsGenerating(false);
  }
  const savePlaylist = () => {
    fetch("https://finalwork-moodwave-api.onrender.com/playlistAI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uuid,
        playlist: { name: "Gen. playlist" + " " + uuidv4(), playlist },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.status == "Saved") {
          resetTranscript();
          setPlaylist([]);
          toast.success("playlist sucessfully saved", {
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
            },
            icon: "✅",
          });
          return;
        }
      });
  };
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    setText(transcript);
  }, [transcript]);
  const user = useLoaderData();
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {!user ? (
        <Navigate to="/login" />
      ) : (
        <>
          {" "}
          <Sidebar
            visible={visibleBottom}
            position="bottom"
            style={{
              backgroundColor: "#692e65",
              height: "93%",
              borderRadius: "10px",
              padding: "20px",
            }}
            onHide={() => setVisibleBottom(false)}
          >
            <div
              className="next-button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {listening ? (
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#d43b84",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "10px",
                    width: "100px",
                    padding: "10px",
                  }}
                  onClick={() => {
                    SpeechRecognition.stopListening();
                    API();
                  }}
                >
                  Stop
                </button>
              ) : (
                <button
                  className="next"
                  onClick={() => {
                    setPlaylist([]);
                    resetTranscript();
                    setText("");
                    SpeechRecognition.startListening({
                      continuous: true,
                      language: "en-US",
                    });
                  }}
                >
                  Talk
                </button>
              )}

              {playlist.length != 0 && (
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#d43b84",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  onClick={savePlaylist}
                >
                  Save playlist
                </button>
              )}
            </div>
            <p
              style={{
                color: "white",
                fontSize: "20px",
                marginBottom: "30px",
                marginTop: "30px",
              }}
            >
              {text}
            </p>
            {isGenerating ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <BeatLoader color="#ffff" />
              </div>
            ) : (
              playlist.length != 0 &&
              playlist.map((track) => (
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
              ))
            )}
          </Sidebar>
          <div className="generate-container">
            <div
              className="generate"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="heading">
                <h2>
                  Hi, <span>{user.username}</span>👋🏻
                </h2>
                <h2>How are you feeling today?</h2>
              </div>
              <div
                className="bowl"
                onClick={() => setVisibleBottom(true)}
              ></div>
            </div>

            <Navbar />
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Generate;
