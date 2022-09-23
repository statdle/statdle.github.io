import React, { useState } from "react";
import CatagoryRow from "../CatagoryRow/CatagoryRow.js";
import CatagoryTitle from "../CatagoryTitle/CatagoryTitle.js";
import CatagoryLine from "../CatagoryLine/CatagoryLine.js";
import './catagoryGroup.scss';

// props: values[<catgoryName>, high, highname, low, lowName, target], active<[0, 0, 0, 0]>
const CatagoryGroup = (props) => {

  const [showValues, setShowValues] = useState(false);
  const category = props.values[1];

  const flipShowValues = () => {
    if(category.highValues[0] || category.lowValues[0]){
    setShowValues(!showValues);
    }
  };

  // console.log(props.values[0]);
  
  return (
    <div key={props.values[0]} className="catagory-row">
      <CatagoryTitle index={props.values[0]} />
      <CatagoryLine active={props.active[0]} />
      <CatagoryRow
        className={props.active[1]}
        direction={"↓"}
        rank={category.high}
        code={category.highValues[0]}
        name={category.highValues[1]}
        value={category.highValues[2]}
        active={props.active[1]}
        flipShowValues={flipShowValues}
        showValues={showValues}
      />
      <CatagoryRow
        className={props.active[2]}
        direction={"↑"}
        rank={category.low}
        code={category.lowValues[0]}
        name={category.lowValues[1]}
        value={category.lowValues[2]}
        active={props.active[2]}
        flipShowValues={flipShowValues}
        showValues={showValues}
      />
      <CatagoryLine active={props.active[3]} />
    </div>
  );
};

export default CatagoryGroup;
