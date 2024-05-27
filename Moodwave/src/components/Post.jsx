import Avatar from "@mui/joy/Avatar";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

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
      <div className="card">
        <div className="info-user">
          <div className="info-user-text">
            <Link to={"/profile"}>
              <Avatar src={data.user.profile_image}></Avatar>
            </Link>
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
            <button className="save">Save playlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
