import React from "react";

//values={this.state.catagories}
//currentCountry

function Display(props) {
  const catagories = Object.entries(props.values).map((key, value) => {
    // Is having IF statements in the classNames more efficient than if(HIGH) else if(LOW) else if
    return (
      <div key={value} className="catagory-row">
        <h2 className="catagory-title">{catagoryNames[key[0]]}</h2>
        <div className="line-row">
          <span
            className={
              "rank-number " +
              (key[1].highName === props.currentCountry ? "active" : "")
            }
          >
            {"↓ " + key[1].high}
          </span>
          <span
            className={
              "country-name " +
              (key[1].highName === props.currentCountry ? "active" : "")
            }
          >
            {key[1].highName}
          </span>
        </div>
        <div className="line-row">
          <span
            className={
              "rank-number " +
              (key[1].lowName === props.currentCountry ? "active" : "")
            }
          >
            {"↑ " + key[1].low}
          </span>
          <span
            className={
              "country-name " +
              (key[1].lowName === props.currentCountry ? "active" : "")
            }
          >
            {key[1].lowName}
          </span>
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
