import React from "react";

const Top = (props) => {
  let fillerText = " Guesses";
  if (props.guessCount === 1) {
    fillerText = " Guess";
  }
  return (
    <nav className="top-nav">
      <p>{props.guessCount + fillerText}</p>
      <p onClick={() => props.toggleModal("win")}>Nerdle</p>
      <div>
        <span
          className="material-icons btn btn-dark"
          onClick={() => props.toggleModal("how")}
        >
          help
        </span>
        <span
          className="material-icons btn btn-dark"
          onClick={() => props.toggleModal("settings")}
        >
          settings
        </span>
      </div>
    </nav>
  );
};

export default Top;
