import "./playlistpreview-modules.css";
import Booba from "../assets/booba-2.jpeg";
import { FaPlay } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import BackButton from "../assets/backbutton.png";
import { Link } from "react-router-dom";

const PlaylistPreview = () => {
  return (
    <div className="playlist-container">
      <Link to={"/profile"}>
        <div className="back">
          <img src={BackButton} alt="backbutton" />
        </div>
      </Link>
      <div className="playlist">
        <div className="playlist-image">
          <img src={Booba} alt="" />
          <h2>Generated playlist</h2>
          <p>10 tracks - 51 minutes</p>
          <button className="play">
            <FaPlay size={30} color="white" alignmentBaseline="center" />
          </button>
        </div>
        <div className="music-list">
          <img src="" alt="" />
          <p>Here will be the title of the music</p>
          <FaPlay size={20} color="white" alignmentBaseline="center" />
          <img src="" alt="" />
          <p>Here will be the title of the music</p>
          <FaPlay size={20} color="white" alignmentBaseline="center" />
          <img src="" alt="" />
          <p>Here will be the title of the music</p>
          <FaPlay size={20} color="white" alignmentBaseline="center" />
          <img src="" alt="" />
          <p>Here will be the title of the music</p>
          <FaPlay size={20} color="white" alignmentBaseline="center" />
          <img src="" alt="" />
          <p>Here will be the title of the music</p>
          <FaPlay size={20} color="white" alignmentBaseline="center" />
          <img src="" alt="" />
          <p>Here will be the title of the music</p>
          <FaPlay size={20} color="white" alignmentBaseline="center" />
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default PlaylistPreview;
