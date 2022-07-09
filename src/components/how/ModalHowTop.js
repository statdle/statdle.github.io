import React from "react";
import '../../styles/common/_nav.scss';

const ModalHowTop = (props) => {
  return (
    <nav className="nav">
      <h1 className="nav__item nav__left">Statdle</h1>
      <b className="nav__item">How to Play</b>
      <div className="nav__item nav__right">
        <button className="btn material-icons" onClick={() => props.toggleModal(0)}> close </button>
      </div>
    </nav>
  );
};

export default ModalHowTop;