import React from "react";

const ModalHow = (props) => {
  return (
    <>
      <p>
        Goal: Find out the <em>Unknown Country</em>
      </p>
      <p className="mag-top">
        When you guess a countries will tell you their <em>Rank</em> and if they
        are ranked above or below the <em> Unknown Country</em>, on 4 random
        catagories.
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
        <em>Austria</em> is rank 10 Alphabetically, above the{" "}
        <em>Unknown Country</em>
        <br />
        <em>San Marino</em> is rank 149 Alphabetically, below the{" "}
        <em>Unknown Country</em>
      </p>
      <p className="mag-top">
        Further guesses will only retain the countries closest to the{" "}
        <em>Unknown Country</em>.
      </p>
    </>
  );
};

export default ModalHow;
