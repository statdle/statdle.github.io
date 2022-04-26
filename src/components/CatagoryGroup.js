import React from "react";
import CatagoryRow from "./CatagoryRow.js";
import CatagoryTitle from "./CatagoryTitle.js";
import LineThing from "./LineThing.js";

// props: values[<catgoryName>, high, highname, low, lowName, target], active<[0, 0, 0, 0]>
let CatagoryGroup = (props) => {
  return (
    <div key={props.values[0]} className="catagory-row">
      <CatagoryTitle title={props.values[0]} />
      <LineThing active={props.active[0]} />
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
      <LineThing active={props.active[3]} />
    </div>
  );
};

export default CatagoryGroup;
