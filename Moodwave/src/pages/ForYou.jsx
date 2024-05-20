import Avatar from "@mui/joy/Avatar";
import "./foryou-modules.css";
import Caroussel from "../components/Caroussel";
import JUL from "../assets/jul.jpeg";
import Navbar from "../components/Navbar";

const ForYou = () => {
  return (
    <>
      <div className="for-you-container">
        <div className="for-you">
          <div className="searchbar-music">
            <Avatar>IO</Avatar>
            <input
              type="text"
              id="searchbar"
              placeholder="Share everything you want."
            />
          </div>
          <div className="popular">
            <h2>Popular Now</h2>
            <Caroussel />
          </div>
          <div className="selected">
            <h2>Selected for you</h2>
          </div>
          <div className="trending-artists">
            <h2>Trending Artists</h2>
            <div className="trending-artist-content">
              <img src={JUL} alt="" />
              <img src={JUL} alt="" />
              <img src={JUL} alt="" />
              <img src={JUL} alt="" />
              <img src={JUL} alt="" />
              <img src={JUL} alt="" />
              <img src={JUL} alt="" />
              <img src={JUL} alt="" />
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default ForYou;
