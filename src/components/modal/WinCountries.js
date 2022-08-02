import React from "react";
import countriesEmojis from "../../assets/countriesEmojis.json";
import Twemoji from "../../assets/Twemoji";

// props: stats, win [true/false]
const WinCountries = (props) => {
  let countries = Object.entries(props.history).map((obj, index) => {
    const val = obj[1].name;

    const emoji = countriesEmojis[val] ? countriesEmojis[val] + "\xa0\xa0" : "";

    if (index === (props.history.length - 1)) { //if last element
      return (
        <div key={index} className={props.win ? "country-guess country-guess--active" : "country-guess"}>
          <Twemoji emoji={emoji} />{val}
        </div>
      );
    }

    //normal condition
    return (
      <div key={index} className="country-guess">
        <Twemoji emoji={emoji} />{val}
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
