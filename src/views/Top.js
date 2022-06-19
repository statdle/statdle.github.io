import React from "react";

const Top = (props) => {
  let fillerText = " Guesses";
  if (props.guessCount === 1) {
    fillerText = " Guess";
  }
  return (
    <div id="nav-container">
      <nav className="top-nav">
        <h1 className="statdle-title">Statdle</h1>
        <p>{props.guessCount + fillerText}</p>
        <div>
        <span
            className="material-icons btn btn-dark"
            onClick={() => props.toggleModal(2)}
          >
            leaderboard
          </span>
          <span
            className="material-icons btn btn-dark"
            onClick={() => props.toggleModal(1)}
          >
            help_outline
          </span>

        </div>
      </nav>
    </div>
  );
};

export default Top;
