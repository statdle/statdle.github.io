import React, { useEffect } from "react";

/* display={this.state.popupType} togglePopup={this.togglePopup} /> */
let Popup = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.togglePopup(0);
    }, 3000);
    return () => clearTimeout(timer);
  }, [props]);

  switch (props.display) {
    case 0:
      break;
    case 1:
      return (
        <div className="popup">Duplicate Country</div>
      );
    case 2:
      return (
        <div className="popup">Invalid Country</div>
      );
    case 3:
      return (
        <div className="popup">Copied to Clipboard</div>
      );
    default:
      return <div className="popup">{props.display}</div>;
  }
};

export default Popup;
