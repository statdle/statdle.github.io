import React from "react";

//values={this.state.catagories}
//currentCountry

function Display(props) {
  const lineThingActive = (
    <div className="line-row">
      <span className="line-thing position-symbol active"></span>
      <span className="line-thing rank-number active"></span>
      <span className="line-thing country-name active"></span>
    </div>
  );
  const lineThingInactive = (
    <div className="line-row">
      <span className="line-thing position-symbol"></span>
      <span className="line-thing rank-number"></span>
      <span className="line-thing country-name"></span>
    </div>
  );

  const catagories = Object.entries(props.values).map((key, value) => {
    // Is having IF statements in the classNames more efficient than if(HIGH) else if(LOW) else if
    // well i did ^ adding the line thing but it feels so basic... i just want to add a conditional class to everything!

    let highDisplay;
    let lowDisplay;
    let highLineThing;
    let lowLineThing;
    if (key[1].lineThing === 1) {
      highLineThing = lineThingInactive;
      lowLineThing = lineThingActive;
    } else if (key[1].lineThing === 2) {
      highLineThing = lineThingActive;
      lowLineThing = lineThingInactive;
    } else {
      highLineThing = lineThingInactive;
      lowLineThing = lineThingInactive;
    }

    if (key[1].highName === props.currentCountry) {
      highDisplay = (
        <div className="line-row">
          <span className="row-item position-symbol active">↓</span>
          <span className="row-item rank-number active">
            {key[1].high ? "#" + key[1].high : ""}
          </span>
          <span className="row-item country-name active">
            {key[1].highName}
          </span>
        </div>
      );
    } else {
      highDisplay = (
        <div className="line-row">
          <span className="row-item position-symbol">↓</span>
          <span className="row-item rank-number">
            {key[1].high ? "#" + key[1].high : ""}
          </span>
          <span className="row-item country-name">{key[1].highName}</span>
        </div>
      );
    }

    if (key[1].lowName === props.currentCountry) {
      lowDisplay = (
        <div className="line-row">
          <span className="row-item position-symbol active">↑</span>
          <span className="row-item rank-number active">
            {key[1].low ? "#" + key[1].low : ""}
          </span>
          <span className="row-item country-name active">{key[1].lowName}</span>
        </div>
      );
    } else {
      lowDisplay = (
        <div className="line-row">
          <span className="row-item position-symbol">↑</span>
          <span className="row-item rank-number">
            {key[1].low ? "#" + key[1].low : ""}
          </span>
          <span className="row-item country-name">{key[1].lowName}</span>
        </div>
      );
    }

    return (
      <div key={value} className="catagory-row">
        <h2 className="catagory-title">{catagoryNames[key[0]]}</h2>
        {highLineThing}
        {highDisplay}
        {lowDisplay}
        {lowLineThing}
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
