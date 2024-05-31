import "./blog-modules.css";
import Avatar from "@mui/joy/Avatar";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { useContext, useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Textarea } from "@mui/joy";
import SelectIndicator from "../components/SelectIndicator";
import { Navigate, useLoaderData } from "react-router-dom";
import Moods from "./moods.json";
import Select from "react-select";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const user = useLoaderData();
  const [inputs, setInputs] = useState({ mood: "", text: "", playlist: "" });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(true);
  const createPost = () => {
    if (!inputs.text || !inputs.mood || !inputs.playlist) {
      alert("Please fill in the missing fields");
      return;
    }

    setIsLoading(true);

    fetch("https://finalwork-moodwave-api.onrender.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.uuid,
        text: inputs.text,
        mood: inputs.mood,
        playlist: inputs.playlist,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Bad Request") {
          setIsLoading(false);
          return alert(data.message);
        }
        setIsLoading(false);
        window.location.reload();
      });
  };

  useEffect(() => {
    async function getPosts() {
      fetch("https://finalwork-moodwave-api.onrender.com/posts")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.data);
          setPostLoading(false);
        });
    }
    getPosts();
  }, []);
  return (
    <>
      {!user ? (
        <Navigate to="/login" />
      ) : (
        <>
          <div className="blog">
            <div className="intro-text">
              <h2>Hi {user.username} 👋🏻</h2>
              <p>What do you want to share?</p>
            </div>

            <div className="searchbar">
              <Link to={"/profile"}>
                <Avatar src={user.profile_image} size="lg"></Avatar>
              </Link>
              <input
                onClick={() => setOpen(true)}
                type="text"
                id="searchbar"
                placeholder="Share everything you want."
                readOnly
              />
            </div>

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
                  New Post
                </Typography>
                <Typography
                  id="modal-desc"
                  textColor="white"
                  fontFamily={"Poppins"}
                  marginBottom={"10px"}
                >
                  <p>What is your mood today?</p>
                </Typography>
                <Select
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, mood: e.value }))
                  }
                  styles={{
                    container: (baseStyles) => ({
                      ...baseStyles,
                      color: "black",
                      width: "95%",
                    }),
                  }}
                  options={Moods.map((el) => {
                    return { value: el, label: el };
                  })}
                />
                <Typography
                  id="modal-desc"
                  textColor="white"
                  fontFamily={"Poppins"}
                  marginBottom={"20px"}
                >
                  <p style={{ marginBottom: "10px" }}>
                    Write here what you want to tell
                  </p>

                  <Textarea
                    disabled={false}
                    minRows={5}
                    size="lg"
                    variant="soft"
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, text: e.target.value }))
                    }
                  />
                </Typography>

                <Typography
                  id="modal-desc"
                  textColor="white"
                  fontFamily={"Poppins"}
                  marginBottom={"10px"}
                >
                  <p style={{ marginBottom: "10px" }}> Share your playlist </p>
                  <Select
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, playlist: e.value }))
                    }
                    styles={{
                      container: (baseStyles) => ({
                        ...baseStyles,
                        color: "black",
                        width: "95%",
                      }),
                    }}
                    options={user.playlistAI.map((el) => {
                      return { value: el.name, label: el.name };
                    })}
                  />
                </Typography>
                <div className="submit-button">
                  <button className="submit-post" onClick={createPost}>
                    {isLoading ? <BeatLoader color="#ffff" /> : "Submit"}
                  </button>
                </div>
              </Sheet>
            </Modal>

            <div className="post">
              {postLoading ? (
                <BeatLoader color="#ffff" />
              ) : posts.length === 0 ? (
                <p style={{ color: "white" }}>No posts for the moment ! </p>
              ) : (
                posts
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((post) => (
                    <Post key={post.uuid} data={post} user={user} />
                  ))
              )}
            </div>
          </div>
          <Navbar />{" "}
        </>
      )}
    </>
  );
};

export default Profile;
