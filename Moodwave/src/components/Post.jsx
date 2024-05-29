import Avatar from "@mui/joy/Avatar";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

import "./post-modules.css";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
const Post = ({ data, user }) => {
  const navigate = useNavigate();
  const like = () => {
    fetch("https://finalwork-moodwave-api.onrender.com/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data.uuid, userId: user.uuid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Bad Request") return alert(data.message);
        navigate("/blog");
      });
  };
  const savePlaylist = (playlist) => {
    fetch("https://finalwork-moodwave-api.onrender.com/playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.uuid,
        playlist,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Bad Request") return alert(data.message);
        navigate("/blog");
      });
  };
  const unlike = () => {
    fetch("https://finalwork-moodwave-api.onrender.com/like", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data.uuid, userId: user.uuid }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "Bad Request") return alert(data.message);
        navigate("/blog");
      });
  };
  return (
    <div className="post-container" style={{ width: "100%" }}>
      <motion.div
        className="card"
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeInOut", duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="info-user">
          <div className="info-user-text">
            <Avatar src={data.user.profile_image}></Avatar>

            <div className="info-user-date">
              <h2>{data.user.username}</h2>
              <p>
                {format(data.created_at, "P")} at{" "}
                {format(data.created_at, "H:mm")}
              </p>
            </div>
          </div>
          <div className="mood-badge">
            <p>{data.mood}</p>
          </div>
        </div>
        <div className="text-input">
          <p>{data.text}</p>
          <div className="likes">
            {user.likes.length == 0 ? (
              <FaRegHeart size={30} color="white" onClick={() => like()} />
            ) : !user.likes.find((like) => like.uuid == data.uuid) ? (
              <FaRegHeart size={30} color="white" onClick={() => like()} />
            ) : (
              <FaHeart size={30} onClick={() => unlike()} />
            )}

            {!user.playlist.find((el) => el.name == data?.playlist?.name) && (
              <button
                className="save"
                onClick={() => savePlaylist(data.playlist)}
              >
                Save playlist
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Post;
