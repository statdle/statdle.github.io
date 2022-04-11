import React from "react";

const ModalHow = (props) => {
  return (
    <>
      <p>
        Goal: Find out the <em>Unknown Country</em>
      </p>
      <p>
        Guessing a country will reveal its ranking compared to all countries on
        4 random catagories. Further guesses will The closest countries to the
        <em>Unknown Country</em> are displayed.
      </p>
      <p className="mag-top">
        <b>Example</b>
      </p>
      <div className="onboard-example">
        <h2 className="catagory-title">Alphabetically</h2>
        <div className="line-row">
          <span className="row-item position-symbol">↓</span>
          <span className="row-item rank-number">10</span>
          <span className="row-item country-name">Austria</span>
        </div>
        <div className="line-row">
          <span className="row-item position-symbol active">↑</span>
          <span className="row-item rank-number active">149</span>
          <span className="row-item country-name active">San Marino</span>
        </div>
      </div>

      <p>
        <em>Austria</em> is 10th, while <em>San Marino</em> is 149th
        Alphabetically. The <em>Unknown Country</em> is therefore between ranks
        10 and 149.
      </p>
    </>
  );
};

export default ModalHow;
