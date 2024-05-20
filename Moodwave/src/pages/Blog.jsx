import "./blog-modules.css";
import Avatar from "@mui/joy/Avatar";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Textarea } from "@mui/joy";
import SelectIndicator from "../components/SelectIndicator";

const Profile = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="blog">
        <div className="intro-text">
          <h2>Hi Ilias 👋🏻</h2>
          <p>What{"'"}s bothering you?</p>
        </div>

        <div className="searchbar">
          <Avatar>I</Avatar>

          <input
            onClick={() => setOpen(true)}
            type="text"
            id="searchbar"
            placeholder="Share everything you want."
          />
        </div>

        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: "80%",
              height: "auto",
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              backgroundColor: "#692e65",
              border: "none",
              color: "white",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h3"
              textColor="inherit"
              fontWeight="lg"
              textAlign={"center"}
              fontFamily={"Poppins"}
              color="white"
              mb={1}
            >
              New Post
            </Typography>
            <Typography
              id="modal-desc"
              textColor="white"
              fontFamily={"Poppins"}
              marginBottom={"10px"}
            >
              <p>What is your mood today?</p>
            </Typography>

            <Typography
              id="modal-desc"
              textColor="white"
              fontFamily={"Poppins"}
              marginBottom={"20px"}
            >
              <p style={{ marginBottom: "10px" }}>
                Write here what you want to tell
              </p>

              <Textarea disabled={false} minRows={5} size="lg" variant="soft" />
            </Typography>

            <Typography
              id="modal-desc"
              textColor="white"
              fontFamily={"Poppins"}
              marginBottom={"10px"}
            >
              <p style={{ marginBottom: "10px" }}> Share your playlist </p>
              <SelectIndicator />
            </Typography>
            <div className="submit-button">
              <button className="submit-post">Submit</button>
            </div>
          </Sheet>
        </Modal>

        <div className="post">
          <Post />
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Profile;
