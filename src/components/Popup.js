import React from "react";

let Popup = (props) => {
  if (props.text) {
    return <div className="popup">{props.text}</div>;
  } else {
    return <></>;
  }
};

export default Popup;
