import { RiHome2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { RiAiGenerate } from "react-icons/ri";
import { TbMusicSearch } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
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
          {pathname == "/blog" ? (
            <RiHome2Line color="#D43B84" size={27} />
          ) : (
            <RiHome2Line color="white" size={27} />
          )}
        </Link>
        <Link to={"/for-you"}>
          {pathname == "/for-you" ? (
            <TbMusicSearch color="#D43B84" size={27} />
          ) : (
            <TbMusicSearch color="white" size={27} />
          )}
        </Link>
        <Link to={"/generate"}>
          {pathname == "/generate" ? (
            <RiAiGenerate color="#D43B84" size={27} />
          ) : (
            <RiAiGenerate color="white" size={27} />
          )}
        </Link>
        <Link to={"/profile"}>
          {pathname == "/profile" ? (
            <FaRegUser color="#D43B84" size={27} />
          ) : (
            <FaRegUser color="white" size={27} />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
