import React, { useEffect } from "react";
import './popup.scss';

/* display={this.state.popupType} togglePopup={this.togglePopup} /> */
const Popup = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.togglePopup(0);
    }, 3000);
    return () => clearTimeout(timer);
  }, [props]);

  let text = "";
  switch (props.display) {
    case 0:
      break;
    case 1:
      text = "Duplicate Country";
      break;
    case 2:
      text = "Invalid Country";
      break;
    case 3:
      text = "Copied to Clipboard";
      break;
    case 4:
      text = "Well Done!";
      break;
    default:
      text = props.display;
  }

  return (<div role="alert" className="popup">{text}</div>);
};

export default Popup;
