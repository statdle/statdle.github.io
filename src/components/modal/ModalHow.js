import React from "react";
import ModalHowContent from "./ModalHowContent";
import ModalHowTop from "./ModalHowTop";

const ModalHow = (props) => {
  return (
    <>
      <ModalHowTop toggleModal={props.toggleModal}/>
      <ModalHowContent/>
    </>
  )}

export default ModalHow;