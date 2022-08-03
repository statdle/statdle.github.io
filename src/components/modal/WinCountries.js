import React from "react";
import countriesEmojis from "../../assets/countriesEmojis.json";
import Twemoji from "../../assets/Twemoji";

// props: stats, win [true/false]
const WinCountries = (props) => {
  let countries = Object.entries(props.history).map((obj, index) => {
    const name = obj[1].name;
    const emoji = countriesEmojis[name] || "";

    if (index === (props.history.length - 1)) {
      return (
        <div key={index} className={props.win ? "row-item row-item--active country-guess" : "row-item country-guess"}>
          <Twemoji className="emoji" emoji={emoji} />
          <span>{name}</span>
        </div>
      );
    }

    return (
      <div key={index} className="row-item country-guess">
        <Twemoji className="emoji" emoji={emoji} />
        <span>{name}</span>
      </div>
    );
  });

  return (
    <>
      <h3>Guessed Countries:</h3>
      <div className="country-guess__container">{countries}</div>
    </>
  );
};

export default WinCountries;
