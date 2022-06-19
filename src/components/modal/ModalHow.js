import React from "react";
import ModalHowContent from "./ModalHowContent";
import ModalHowTop from "./ModalHowTop";
import ModalHowBottom from "./ModalHowBottom";

const ModalHow = (props) => {
  return (
    <>
      <ModalHowTop toggleModal={props.toggleModal}/>
      <ModalHowContent/>
      <ModalHowBottom toggleModal={props.toggleModal}/>
    </>
  )}

export default ModalHow;