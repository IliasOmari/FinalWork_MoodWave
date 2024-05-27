import { useEffect, useState } from "react";
import "./createprofile-modules.css";
import { TbReload } from "react-icons/tb";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import Select from "react-select";
import Genres from "./genres.json";
import { BeatLoader } from "react-spinners";
import { Navigate, useLoaderData } from "react-router-dom";

const CreateProfile = () => {
  const user = useLoaderData();
  const [inputs, setInputs] = useState({ username: "", genres: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [svg, setSvg] = useState("");
  const [change, setChange] = useState(false);
  useEffect(() => {
    async function getUri() {
      const avatar = createAvatar(identicon, {
        seed: Math.random(),
        radius: "50%",
        backgroundType: ["gradientLinear", "solid"],
      });
      const svg = await avatar.toDataUri();
      setSvg(svg);
    }

    getUri();
  }, [change]);

  const createProfile = () => {
    if (!svg || inputs.genres.length === 0 || !inputs.username) {
      alert("Please fill in the missing fields");
      return;
    }

    setIsLoading(true);

    fetch("https://finalwork-moodwave.onrender.com/updateProfile", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genres: inputs.genres,
        username: inputs.username,
        image: svg,
        id: localStorage.getItem("id") ?? null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setIsLoading(false);
          alert(data.error);
        }
        window.location.href = "/profile";
      });
  };

  return (
    <>
      {!user ? (
        <Navigate to="/login" />
      ) : user?.username ? (
        <Navigate to="/profile" />
      ) : (
        <>
          {" "}
          <div className="background">
            <div className="title-create">
              <h1>Create your profile </h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={svg} className="avatar" />
              <TbReload
                color="white"
                size={20}
                onClick={() => setChange((prev) => !prev)}
              />
            </div>
            <div className="profile-inputs">
              <label className="label_username" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, username: e.target.value }))
                }
              />
              <label className="label_username" htmlFor="username">
                Favourite music genres
              </label>
              <Select
                onChange={(e) => setInputs((prev) => ({ ...prev, genres: e }))}
                isMulti
                styles={{
                  container: (baseStyles) => ({
                    ...baseStyles,
                    color: "black",
                    width: "95%",
                  }),
                }}
                options={Genres.map((el) => {
                  return { value: el, label: el };
                })}
              />
            </div>

            <div className="button">
              <button className="submit" onClick={() => createProfile()}>
                {isLoading ? <BeatLoader color="#ffff" /> : "Save changes"}
              </button>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default CreateProfile;
