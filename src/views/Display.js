import CatagoryGroup from "../components/CatagoryGroup.js";
import React from "react";

//props: values={this.state.catagories}, currentCountry
function Display(props) {
  const catagories = Object.entries(props.values).map((key, value) => {
    let active = [0, 0, 0, 0]; // LineThing, high, low, LineThing
    // line thing logic
    if (key[1].lineThing === 1) {
      active[0] = 1;
    } else if (key[1].lineThing === 2) {
      active[3] = 1;
    }

    // actual thing logic
    if (key[1].highName === props.currentCountry) {
      active[1] = 1;
    }
    if (key[1].lowName === props.currentCountry) {
      active[2] = 1;
    }

    return <CatagoryGroup active={active} values={key} key={value} />;
  });

  return <div id="catagories-container">{catagories}</div>;
}

export default Display;
