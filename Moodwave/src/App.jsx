import { Link } from "react-router-dom";
import "./App.css";

function App() {
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
          <Link to={"/google"} style={{ textDecoration: "none" }}>
            <button className="google">Sign in with Google</button>
          </Link>
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
