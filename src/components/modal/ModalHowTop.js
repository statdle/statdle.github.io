import React from "react";

const ModalHowTop = (props) => {
  return (
    <div id="nav-container">
      <nav className="top-nav">
        <h1 className="statdle-title">Statdle</h1>
        <p className="nav-mid">How to Play</p>
        <div onClick={() => props.toggleModal(0)} className="btn nav-right">
          <span className="btn-text">To Game</span>
          <span className="material-icons"> close </span>
        </div>  
      </nav>
    </div>
  );
};

export default ModalHowTop;