import React, { useEffect, useState } from "react";

let Popup = (props) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(!visible);
    }, "3000");
  }, ["3000"]);

  return visible ? (
    <div className="popup" key={Math.random()}>
      {props.text}
    </div>
  ) : (
    <div />
  );
};

export default Popup;
