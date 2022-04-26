import React from "react";

// props: stats
let WinCountries = (props) => {
  let countries = Object.entries(props.history).map((key, value) => {
    if (key[0] === "3" && props.history.length > 10) {
      return (
        <div key={key[0] + value[0]} className="country-guess">
          ...
        </div>
      );
    } else if (key[0] > 3 && key[0] < props.history.length - 5) {
      return <></>;
    } else {
      return (
        <div key={key[0] + value[0]} className="country-guess">
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
