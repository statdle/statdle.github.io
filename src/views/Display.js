import CatagoryGroup from "../components/display/CatagoryGroup.js";
import React from "react";

//props: values={this.state.catagories}
function Display(props) {
  const catagories = Object.entries(props.values).map((values, index) => {

    let active = [false, false, false, false]; // LineThing, high, low, LineThing
    if(values[1].activeRow === -2){ //win condition
      active = [false, true, true, false];
    } else if(values[1].activeRow === -1){
      active[values[1].activeRow] = true;
    }

    return <CatagoryGroup active={active} values={values} key={index} />;
  });

  return <div id="catagories-container">{catagories}</div>;
}

export default Display;
