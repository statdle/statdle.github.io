import React from "react";

const ModalHowBottom = (props) => {
  return (
    <div className="bottom-button">
      <div onClick={() => props.toggleModal(0)} className="btn-wide btn-modal btn-active">
          Play Game   
      </div>
    </div>
  );
};

export default ModalHowBottom;