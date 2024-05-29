import "./login-modules.css";
import BackButton from "../assets/backbutton.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const register = (e) => {
    e.preventDefault();
    if (!inputs.fullname || !inputs.email || !inputs.password) {
      toast.error("Please fill in the missing fields", {
        duration: 4000,
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: "✍️",
      });
      return;
    }
    setIsLoading(true);
    fetch("https://finalwork-moodwave-api.onrender.com/register", {
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
          toast.error(data.message, {
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
            },
            icon: "😬",
          });
          return;
        }
        window.location.href = "/login";
      });
  };
  return (
    <div className="container">
      <div className="background">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="back">
          <Link to={"/"}>
            <img src={BackButton} alt="backbutton" />
          </Link>
        </div>
        <div className="title">
          <h1>Sign Up </h1>
        </div>
        <form onSubmit={register}>
          <div className="login-inputs">
            <label className="label_name" htmlFor="name">
              Full name
            </label>
            <input
              type="text"
              id="name_user"
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, fullname: e.target.value }))
              }
            />

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
            <div className="button">
              <button className="submit">
                {isLoading ? <BeatLoader color="#ffff" /> : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
