import React from "react";

const ModalHowBottom = (props) => {
  return (
    <div className="bottom-button-container">
      <button onClick={() => props.toggleModal(0)} className="btn btn--wide btn--active">
        Play Game
      </button>
    </div>
  );
};

export default ModalHowBottom;