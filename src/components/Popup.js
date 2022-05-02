import React, { useEffect } from "react";

/* display={this.state.popupType} togglePopup={this.togglePopup} /> */
let Popup = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.togglePopup(0);
    }, 3000);
    return () => clearTimeout(timer);
  }, [props]);

  return <div className="popup">{props.display}</div>;
};

export default Popup;
