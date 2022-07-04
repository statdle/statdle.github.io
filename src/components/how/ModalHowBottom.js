import React from "react";

const ModalHowBottom = (props) => {
  return (
    <div className="bottom-button-container">
      <div onClick={() => props.toggleModal(0)} className="btn btn--wide btn--active">
        Play Game
      </div>
    </div>
  );
};

export default ModalHowBottom;