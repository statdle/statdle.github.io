import React from "react";

const ModalHowTop = (props) => {
  return (
    <div id="nav-container">
      <nav className="top-nav">
        <h1 className="statdle-title">Statdle</h1>
        <p className="nav-mid">How to Play</p>

          <span onClick={() => props.toggleModal(0)} className="btn material-icons"> close </span>
      </nav>
    </div>
  );
};

export default ModalHowTop;