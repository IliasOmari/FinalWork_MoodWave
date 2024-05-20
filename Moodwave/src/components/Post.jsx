import Avatar from "@mui/joy/Avatar";
import { CiHeart } from "react-icons/ci";
import "./post-modules.css";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div className="post-container">
      <div className="card">
        <div className="info-user">
          <div className="info-user-text">
            <Link to={"/profile"}>
              <Avatar>I</Avatar>
            </Link>
            <div className="info-user-date">
              <h2>Ilias </h2>
              <p>10 minutes ago</p>
            </div>
          </div>
          <div className="mood-badge">
            <p>Happy</p>
          </div>
        </div>
        <div className="text-input">
          {/* <input type="text" id="user-text" /> */}
          <p>
            Not the best day today , but thankfully, MoodWave understood the
            vibe and curated a playlist to lift my spirits 🎶. The magic of
            music! Thanks @MoodWaveApp{". "}
          </p>

          <div className="likes">
            <CiHeart size={30} color="white" />
            <button className="save">Save playlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
