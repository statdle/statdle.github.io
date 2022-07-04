import React from "react";
import '../../styles/common/_nav.scss';

const ModalHowTop = (props) => {
  return (
    <div className="nav__wrapper">
      <nav className="nav">
        <h1 className="nav__item nav__left">Statdle</h1>
        <b className="nav__item">How to Play</b>
        <div className="nav__item nav__right">
          <span className="btn btn--dark material-icons" onClick={() => props.toggleModal(0)}> close </span>
        </div>
      </nav>
    </div>
  );
};

export default ModalHowTop;