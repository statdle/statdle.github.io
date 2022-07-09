import React from "react";
import '../styles/common/_nav.scss';

const Top = (props) => {
  let fillerText = " Guesses";
  if (props.guessCount === 1) {
    fillerText = " Guess";
  }
  return (
    <nav className="nav" role="menubar">
      <h1 className="nav__item nav__left">Statdle</h1>
      <p className="nav__item"
        role="menuitem"
      >{props.guessCount + fillerText}</p>
      <div className="nav__item nav__right">
        <button
          role="menuitem"
          aria-label="results"
          tabIndex="0"
          className="material-icons btn"
          onClick={() => props.toggleModal(2)}
        >
          leaderboard

        </button>
        <button
          role="menuitem"
          aria-label="how to play"
          tabIndex="0"
          className="material-icons btn"
          onClick={() => props.toggleModal(1)}
        >
          help_outline
        </button>
      </div>
    </nav>
  );
};

export default Top;
