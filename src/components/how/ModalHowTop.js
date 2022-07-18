import React from "react";
import '../../styles/common/_nav.scss';
import Close from '../../assets/icons/close.svg';

const ModalHowTop = (props) => {
  return (
    <nav className="nav">
      <h1 className="nav__item nav__left">Statdle</h1>
      <b className="nav__item">How to Play</b>
      <div className="nav__item nav__right">
        <button
          role="menuitem"
          aria-label="close"
          tabIndex="0"
          className="btn btn--icon"
          onClick={() => props.toggleModal(0)}
        >
          <img className="icons" src={Close} alt="Close" />
        </button>
      </div>
    </nav>
  );
};

export default ModalHowTop;



