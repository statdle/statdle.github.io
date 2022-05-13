import React from "react";

// props: stats, win [true/false]
let WinCountries = (props) => {
  let countries = Object.entries(props.history).map((key) => {
    if (key[0] === "3" && props.history.length > 10) { //add new ... if condition
      return (
        <div key={key[0]} className="country-guess">
          ...
        </div>
      );
    } else if (key[0] > 3 && key[0] < props.history.length - 5) { //remove other keys
      return <></>;
    } else if (parseInt(key[0]) === (props.history.length - 1)) {
      return (
        <div key={key[0]} className="country-guess country-guess-active">
          {key[1]}
        </div>
      );
    } else {
      return (
        <div key={key[0]} className="country-guess">
          {key[1]}
        </div>
      );
    }
  });

  return (
    <>
      <p className="modal-subtitle">Guessed Countries:</p>
      <div className="country-guess-container">{countries}</div>
    </>
  );
};

export default WinCountries;
