import "./login-modules.css";
import BackButton from "../assets/backbutton.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="background">
        <div className="back">
          <Link to={"/"}>
            <img src={BackButton} alt="backbutton" />
          </Link>
        </div>
        <div className="title">
          <h1>Sign In </h1>
        </div>
        <div className="login-inputs">
          <label className="label_mail" htmlFor="email">
            E-mail
          </label>
          <input type="email" id="email_user" />

          <label className="label_password" htmlFor="password">
            Password
          </label>
          <input type="password" name="password" id="password_user" />
        </div>

        <div className="button">
          <button className="submit">Sign In</button>
        </div>
      </div>
    </>
  );
};

export default Login;
