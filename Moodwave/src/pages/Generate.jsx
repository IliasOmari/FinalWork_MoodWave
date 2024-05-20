import { Sidebar } from "primereact/sidebar";
import Navbar from "../components/Navbar";
import "./generate-modules.css";
import { useState } from "react";
const Generate = () => {
  const [visibleBottom, setVisibleBottom] = useState(false);
  return (
    <>
      <Sidebar
        visible={visibleBottom}
        position="bottom"
        style={{
          backgroundColor: "#692e65",
          height: "93%",
          borderRadius: "10px",
          padding: "20px",
        }}
        onHide={() => setVisibleBottom(false)}
      >
        <div className="step-title">
          <h2>What do you feel?</h2>
        </div>
        <div className="bowl"></div>
        <div className="next-button">
          <button className="next" onClick={() => setVisibleBottom(true)}>
            Next
          </button>
        </div>
      </Sidebar>

      <div className="generate-container">
        <div className="generate">
          <div className="heading">
            <h1>
              Hi, <span>Ilias</span>👋🏻
            </h1>
            <h2>How are you feeling today?</h2>
          </div>
          <div className="bowl" onClick={() => setVisibleBottom(true)}></div>
        </div>
        <Navbar />
      </div>
    </>
  );
};

export default Generate;
