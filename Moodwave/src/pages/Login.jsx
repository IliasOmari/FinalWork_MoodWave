import "./login-modules.css";
import BackButton from "../assets/backbutton.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      alert("Please fill in the missing fields");
      return;
    }
    setIsLoading(true);
    fetch("https://finalwork-moodwave.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Bad Request") {
          setIsLoading(false);
          alert(data.message);
          return;
        }
        localStorage.setItem("id", data.user);
        window.location.href = "/profile";
      });
  };
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

        <form onSubmit={login}>
          <div className="login-inputs">
            <label className="label_mail" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              id="email_user"
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, email: e.target.value }))
              }
            />

            <label className="label_password" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password_user"
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <div className="button">
            <button type="submit" className="submit">
              {isLoading ? <BeatLoader color="#ffff" /> : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
