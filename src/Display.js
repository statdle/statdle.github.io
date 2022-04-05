import React, { Component } from "react";

//values={this.state.catagories}
//history={this.state.catagories}

function Display(props) {
  const catagories = Object.entries(props.values).map((key, value) => {
    var test = "asdabgar";
    return (
      <div key={value} className="catagory-row">
        <h2>{catagoryNames[key[0]]}</h2>
        <div className="line-row">
          <span className="rank-number">↓{key[1].high}</span>
          <span className={"country-name " + (test ? "test" : "")}>
            {key[1].highName}
          </span>
        </div>
        <div className="line-row">
          <span className="rank-number">↑{key[1].low}</span>
          <span className="country-name">{key[1].lowName}</span>
        </div>
      </div>
    );
  });
  return <div id="catagories-container">{catagories}</div>;
}

const catagoryNames = {
  alpha: "Alphabetically",
  area: "Area",
  density: "Density",
  gdp: "GDP",
  gdpcapita: "GDP Per Capita",
  pop: "Population",
};

export default Display;
