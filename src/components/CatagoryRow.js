import React from "react";

// props: direction, rank, name, active
let CatagoryRow = (props) => {
  if (props.active) {
    return (
      <div className="line-row">
        <span className="row-item position-symbol active">
          {props.direction}
        </span>
        <span className="row-item rank-number active">
          {props.rank ? "#" + props.rank : ""}
        </span>
        <span className="row-item country-name active">{props.name}</span>
      </div>
    );
  } else {
    return (
      <div className="line-row">
        <span className="row-item position-symbol">{props.direction}</span>
        <span className="row-item rank-number">
          {props.rank ? "#" + props.rank : ""}
        </span>
        <span className="row-item country-name">{props.name}</span>
      </div>
    );
  }
};

export default CatagoryRow;
