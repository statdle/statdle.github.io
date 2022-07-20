import React from "react";
import '../styles/common/_nav.scss';
import Help from '../assets/icons/help.svg';
import Results from '../assets/icons/results.svg';

const Top = (props) => {
  let fillerText = " Guesses";
  if (props.guessCount === 1) {
    fillerText = " Guess";
  }
  return (
    <nav className="nav" role="menubar">
      <h1 className="nav__item nav__left">Statdle</h1>
      <b className="nav__item"
        role="menuitem"
      >{props.guessCount + fillerText}</b>
      <div className="nav__item nav__right">
        <button
          role="menuitem"
          aria-label="results"
          tabIndex="0"
          className="btn btn--icon"
          onClick={() => props.toggleModal(2)}
        >
          <img className="icons" src={Results} alt="Results" />
        </button>
        <button
          role="menuitem"
          aria-label="how to play"
          tabIndex="0"
          className="btn btn--icon"
          onClick={() => props.toggleModal(1)}
        >
          <img className="icons" src={Help} alt="How to Play" />
        </button>
      </div>
    </nav>
  );
};

export default Top;
