import "./profile-modules.css";
import { FaPlay, FaHeart, FaPause } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import { differenceInMonths } from "date-fns";
import { Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const Profile = () => {
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

  const navigate = useNavigate();
  const user = useLoaderData();
  const unlike = (likeId) => {
    fetch("https://finalwork-moodwave-api.onrender.com/like", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: likeId, userId: user.uuid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Bad Request") return alert(data.message);
        navigate("/profile");
      });
  };

  const unlikeMusic = (musicId) => {
    fetch("https://finalwork-moodwave-api.onrender.com/likeMusic", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ musicId, userId: user.uuid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Bad Request") return alert(data.message);
        navigate("/profile");
      });
  };

  return (
    <>
      {!user ? (
        <Navigate to="/login" />
      ) : !user.username ? (
        <Navigate to="/create-profile" />
      ) : (
        <>
          {" "}
          <div className="profile">
            <div className="profile-header">
              <img
                src={user.profile_image}
                alt=""
                style={{ width: "100px", height: "100px", marginTop: "20px" }}
              />

              <h2>{user.username}</h2>
              <p>
                <span>
                  Member for {differenceInMonths(new Date(), user.created_at)}{" "}
                  months
                </span>
              </p>
            </div>
            <div
              className="badges"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                flexWrap: "wrap",
              }}
            >
              {user.genres.map((genre, index) => (
                <div
                  style={{
                    backgroundColor: "#5ABAEA",
                    padding: "7px",
                    borderRadius: "10px",
                  }}
                  key={index}
                >
                  {genre.value}
                </div>
              ))}
            </div>
            <div className="playlist">
              <h2>Playlist</h2>
              <div className="searchbar-profile">
                <input
                  type="text"
                  id="searchbar"
                  placeholder="Search your playlist...."
                />
              </div>
              <div className="playlist-buttons">
                <button className="generated">AI generated</button>
                <button className="saved">Saved</button>
              </div>
            </div>
            <Link to={"/playlist-preview"}>
              <div className="list-playlists">
                <p>Title of the playlist</p>

                <FaPlay size={20} />
              </div>
            </Link>
            <div className="saved-posts">
              <h2>Liked Posts</h2>
              {user.likes.length == 0
                ? "No likes "
                : user.likes.map((like) => (
                    <div key={like.uuid} className="post-input">
                      <p>{like.text}</p>
                      <div className="post-likes">
                        <FaHeart size={30} onClick={() => unlike(like.uuid)} />
                      </div>
                    </div>
                  ))}
            </div>

            <div>
              <h1
                style={{
                  fontSize: "24px",
                  color: "white",
                  marginBottom: "10px",
                }}
              >
                Liked musics
              </h1>
              {user.music.length == 0
                ? "No music"
                : user.music.map((track) => (
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
                                  selected.name == track.name
                                    ? "#d43b84"
                                    : "white",
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
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          {selected.name === track.name ? (
                            <FaPause
                              size={30}
                              color="white"
                              alignmentBaseline="center"
                              onClick={handlePauseMusic}
                            />
                          ) : (
                            <FaPlay
                              size={30}
                              color="white"
                              alignmentBaseline="center"
                              onClick={() => handlePlayMusic(track)}
                            />
                          )}
                          <FaHeart
                            size={30}
                            onClick={() => unlikeMusic(track.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <Navbar />
        </>
      )}
    </>
  );
};

export default Profile;
