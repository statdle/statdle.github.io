import React, { Component } from "react";

const Top = (props) => {
  return (
    <nav className="top-nav">
      <p>{props.guessCount + " Guesses"}</p>
      <p>Nerdle</p>
      <p className="btn-inline" onClick={() => props.toggleModal()}>
        How to Play
      </p>
    </nav>
  );
};

export default Top;
