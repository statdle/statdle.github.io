import React from "react";
import countriesEmojis from "../../assets/countriesEmojis.json";
import Twemoji from "../../assets/Twemoji";

// props: stats, win [true/false]
const WinCountries = (props) => {
  // TODO refactor as a filter
  let countries = Object.entries(props.history).map((key) => {
    if (key[0] === "3" && props.history.length > 10) { //add new ... if condition
      return (
        <div key={key[0] + key[1]} className="country-guess country-guess--dots">
          ...
        </div>
      )
    };

    if (key[0] > 3 && key[0] < props.history.length - 5) { //remove other keys
      return <></>;
    }

    const emoji = countriesEmojis[key[1]] ? countriesEmojis[key[1]] + "\xa0\xa0" : "";

    if (parseInt(key[0]) === (props.history.length - 1)) { //if last element
      // logic for highlighting last country
      return (
        <div key={key[0] + key[1]} className={props.win ? "country-guess country-guess--active" : "country-guess"}>
          <Twemoji emoji={emoji} />{key[1]}
        </div>
      );
    }

    //normal condition
    return (
      <div key={key[0] + key[1]} className="country-guess">
        <Twemoji emoji={emoji} />{key[1]}
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
