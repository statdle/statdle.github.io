import React from "react";
import CatagoryRow from "../CatagoryRow/CatagoryRow.js";
import CatagoryTitle from "../CatagoryTitle/CatagoryTitle.js";
import CatagoryLine from "../CatagoryLine/CatagoryLine.js";
import './catagoryGroup.scss';

// props: values[<catgoryName>, high, highname, low, lowName, target], active<[0, 0, 0, 0]>
const CatagoryGroup = (props) => {
  return (
    <div key={props.values[0]} className="catagory-row">
      <CatagoryTitle title={props.values[0]} />
      <CatagoryLine active={props.active[0]} />
      <CatagoryRow
        className={props.active[1]}
        direction={"↓"}
        rank={props.values[1].high}
        name={props.values[1].highName}
        active={props.active[1]}
      />
      <CatagoryRow
        className={props.active[2]}
        direction={"↑"}
        rank={props.values[1].low}
        name={props.values[1].lowName}
        active={props.active[2]}
      />
      <CatagoryLine active={props.active[3]} />
    </div>
  );
};

export default CatagoryGroup;
