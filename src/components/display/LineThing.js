import React from "react";

// props: active [true, false]
const LineThing = (props) => {
  if (props.active) {
    return (
      <div className="line-row">
        <span className="line-thing position-symbol active"></span>
        <span className="line-thing rank-number active"></span>
        <span className="line-thing country-name active"></span>
      </div>
    );
  } else {
    return (
      <div className="line-row">
        <span className="line-thing position-symbol"></span>
        <span className="line-thing rank-number"></span>
        <span className="line-thing country-name"></span>
      </div>
    );
  }
};

export default LineThing;