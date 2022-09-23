import React from "react";
import {COUNTRYEMOJI} from "../../../assets/data";
import Twemoji from "../../../assets/Twemoji";
import './catagoryRow.scss';

// props: direction, rank, code, name, value, active, valueText
const CatagoryRow = (props) => {

  const emoji = COUNTRYEMOJI[props.code] || "";
  if (props.active) {
    return (
      <div className="row-group">
        <span className="row-item position-symbol active">
          {props.direction}
        </span>
        <span className="row-item rank-number active">
          {props.rank ? "#" + props.rank : ""}
        </span>

        <button className="row-item country-name active" onClick={props.flipShowValues}>
          <Twemoji className="emoji" emoji={emoji} />
          <span>{props.showValues ? props.value : props.name}</span>
        </button>

      </div>
    );
  } else {
    return (
      <div className="row-group">
        <span className="row-item position-symbol">{props.direction}</span>
        <span className="row-item rank-number">
          {props.rank ? "#" + props.rank : ""}
        </span>
        <button className="row-item country-name" onClick={props.flipShowValues}>
          <Twemoji className="emoji" emoji={emoji} />
          <span>{props.showValues ? props.value : props.name}</span>
        </button>
      </div>
    );
  }
};

export default CatagoryRow;
