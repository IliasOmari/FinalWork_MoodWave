import "./profile-modules.css";
import Test from "../assets/header.png";
import RCT from "../assets/react.svg";
import { FaPlay } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import Navbar from "../components/Navbar";
import Grid from "@mui/joy/Grid";
import Item from "@mui/joy/Grid";
import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <>
      <div className="profile">
        <div className="profile-header">
          <img src={Test} alt="" />
          <div className="profile-picture">
            <img src={RCT} alt="" />
          </div>

          <h2>Ilias Omari</h2>
          <p>
            <span>Member for 6 months</span>
          </p>
        </div>
        <div className="badges">
          <Grid
            container
            spacing={1}
            sx={{ flexGrow: 1 }}
            display={"flex"}
            justifyContent={"center"}
          >
            <Grid xs="6">
              <Item>Rap</Item>
            </Grid>
            <Grid xs="auto">
              <Item>Pop</Item>
            </Grid>
            <Grid xs="auto">
              <Item>Rock</Item>
            </Grid>
            <Grid xs="auto">
              <Item>Jazz</Item>
            </Grid>
            <Grid xs="auto">
              <Item> Reggaetion</Item>
            </Grid>
            <Grid xs="auto">
              <Item> Heavy Metal</Item>
            </Grid>
          </Grid>
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
          <h2>Saved Posts</h2>

          <div className="post-input">
            <p>
              Not the best day today , but thankfully, MoodWave understood the
              vibe and curated a playlist to lift my spirits 🎶. The magic of
              music! Thanks @MoodWaveApp{". "}
            </p>
            <div className="post-likes">
              <CiHeart size={30} color="white" />
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Profile;
