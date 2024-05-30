import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Textarea } from "@mui/joy";
import { BeatLoader } from "react-spinners";
const Popup = () => {
  return (
    <>
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
            New Playlist
          </Typography>

          <Typography
            id="modal-desc"
            textColor="white"
            fontFamily={"Poppins"}
            marginBottom={"20px"}
          >
            <p style={{ marginBottom: "10px" }}>Enter your playlist name</p>

            <Textarea
              disabled={false}
              minRows={1}
              size="lg"
              variant="soft"
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, text: e.target.value }))
              }
            />
          </Typography>

          <div className="submit-button">
            <button className="submit-post">
              Submit
              {/* {isLoading ? <BeatLoader color="#ffff" /> : "Submit"} */}
            </button>
          </div>
        </Sheet>
      </Modal>
    </>
  );
};

export default Popup;
