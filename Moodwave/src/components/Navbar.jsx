import { RiHome2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { RiAiGenerate } from "react-icons/ri";
import { TbMusicSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1,
      }}
    >
      <div
        className="nav-icons"
        style={{
          display: "flex",
          backgroundColor: "#692e65",
          bottom: "0px",
          padding: "15px",

          justifyContent: "space-between",
        }}
      >
        <Link to={"/blog"}>
          <RiHome2Line color="white" size={27} />
        </Link>
        <Link to={"/for-you"}>
          <TbMusicSearch color="white" size={27} />
        </Link>
        <Link to={"/generate"}>
          <RiAiGenerate color="white" size={27} />
        </Link>
        <Link to={"/profile"}>
          <FaRegUser color="white" size={27} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
