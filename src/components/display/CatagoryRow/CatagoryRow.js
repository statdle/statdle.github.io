import React from "react";
import countriesEmojis from "../../../assets/countriesEmojis.json";
import Twemoji from "../../../assets/Twemoji";
import './catagoryRow.scss';

// props: direction, rank, name, active
const CatagoryRow = (props) => {
  const emoji = countriesEmojis[props.name] || "";
  if (props.active) {
    return (
      <div className="row-group">
        <span className="row-item position-symbol active">
          {props.direction}
        </span>
        <span className="row-item rank-number active">
          {props.rank ? "#" + props.rank : ""}
        </span>
        <span className="row-item country-name active">
          <Twemoji className="emoji" emoji={emoji} />
          <span>{props.name}</span>
        </span>
      </div>
    );
  } else {
    return (
      <div className="row-group">
        <span className="row-item position-symbol">{props.direction}</span>
        <span className="row-item rank-number">
          {props.rank ? "#" + props.rank : ""}
        </span>
        <span className="row-item country-name">
          <Twemoji className="emoji" emoji={emoji} />
          <span>{props.name}</span>
        </span>
      </div>
    );
  }
};

export default CatagoryRow;
