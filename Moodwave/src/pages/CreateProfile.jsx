import "./createprofile-modules.css";
const CreateProfile = () => {
  return (
    <>
      <div className="background">
        <div className="title-create">
          <h1>Create your profile </h1>
        </div>
        <div className="avatar">
          <img src="#" alt="" />
        </div>
        <div className="profile-inputs">
          <label className="label_username" htmlFor="username">
            Username
          </label>
          <input type="text" name="username" id="username" />

          <label className="label_username" htmlFor="username">
            Birthday {"(optional)"}
          </label>
          <input type="date" name="birthday" id="birthday" />

          <label className="label_username" htmlFor="username">
            Favourite music genres
          </label>
          <input type="text" name="music-genres" id="music-genres" />
        </div>

        <div className="button">
          <button className="submit">Save changes</button>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
