import CatagoryGroup from "../components/display/CatagoryGroup/CatagoryGroup.js";
import React from "react";
import './display.scss';

//props: values={this.state.catagories}
function Display(props) {
  const catagories = Object.entries(props.values).map((values, index) => {

    let active = [false, false, false, false]; // LineThing, high, low, LineThing
    if (values[1].activeRow === -2) { //win condition
      active = [false, true, true, false];
    } else if (values[1].activeRow !== -1) {
      active[values[1].activeRow] = true;
    }

    return <CatagoryGroup active={active} values={values} key={index} />;
  });

  return <main id="catagories-container">{catagories}</main>;
}

export default Display;
