import React from "react";
import './catagoryLine.scss';

// props: active [true, false]
const LineThing = (props) => {
  if (props.active) {
    return (
      <div className="row-group">
        <span className="catagory-line position-symbol-line active"></span>
        <span className="catagory-line rank-number-line active"></span>
        <span className="catagory-line country-name-line active"></span>
      </div>
    );
  } else {
    return (
      <div className="row-group">
        <span className="catagory-line position-symbol-line"></span>
        <span className="catagory-line rank-number-line"></span>
        <span className="catagory-line country-name-line"></span>
      </div>
    );
  }
};

export default LineThing;