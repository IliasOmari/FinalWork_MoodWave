import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const googleLogin = () => {
    window.open(
      "https://finalwork-moodwave-api.onrender.com/auth/google",
      "_self"
    );
  };
  return (
    <div className="container-home">
      <div className="background">
        <div className="welcome">
          <h1>
            <span>Mood</span>Wave
          </h1>
        </div>
        <div className="welcome-buttons">
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <button className="signin">Sign in</button>
          </Link>
          <button className="google" onClick={googleLogin}>
            Sign in with Google
          </button>
          <p>
            You don{"'"}t have an account yet ?
            <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
              <span> Sign up !</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
