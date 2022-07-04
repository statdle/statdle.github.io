import React from "react";
import '../styles/common/_nav.scss';

const Top = (props) => {
  let fillerText = " Guesses";
  if (props.guessCount === 1) {
    fillerText = " Guess";
  }
  return (
    <div className="nav__wrapper">
      <nav className="nav">
        <h1 className="nav__item nav__left">Statdle</h1>
        <p className="nav__item">{props.guessCount + fillerText}</p>
        <div className="nav__item nav__right">
          <span
            className="material-icons btn btn--dark"
            onClick={() => props.toggleModal(2)}
          >
            leaderboard
          </span>
          <span
            className="material-icons btn btn--dark"
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
