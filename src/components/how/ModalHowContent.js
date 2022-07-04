import React from "react";
import CatagoryGroup from "../display/CatagoryGroup/CatagoryGroup";

const ModalHowContent = () => {
  const exampleOne = (
    <div className="onboard-example">
      <CatagoryGroup
        values={[
          "alp",
          {
            high: 10,
            highName: "Austria",
            low: 149,
            lowName: "San Marino",
            target: 11,
          },
        ]}
        active={[0, 0, 1, 0]}
        key={"ex1"}
      />
    </div>
  );

  const exampleTwo = (
    <div className="onboard-example">
      <CatagoryGroup
        values={[
          "alp",
          {
            high: 10,
            highName: "Austria",
            low: 149,
            lowName: "San Marino",
            target: 11,
          },
        ]}
        active={[0, 0, 0, 1]}
        key={"ex2"}
      />
    </div>
  );

  return (
    <div className="how-container">
      <h1>
        Find the Secret Country using Statistics! A new game everyday!
      </h1>
      <p className="small-space">
        You are given 4 random statistics that will help you figure out what the hidden country is. Guessing a country will reveal it's rank among each category, and if that rank is above or below the <em>Secret Country</em>.
      </p>
      <h3 className="big-space">Examples</h3>
      {exampleOne}
      <ul>
        <li>
          <em>Austria</em> is rank #10, above the <em>Secret Country</em>, while <em>San Marino</em> is below at rank #149. Hence the <em>Secret Country</em> is between #14 and #129.
        </li>
      </ul>
      {exampleTwo}
      <ul>
        <li>
          A new guess, like <em>Zimbabwe</em> is lower than
          both <em>San Marino</em> and the <em>Secret Country</em>, displayed with a line.
        </li>
        <div className="big-space">
          <a className="link" href="https://docs.google.com/forms/d/e/1FAIpQLSf9NfB5E7mMjUAhYh-GrwS8uS1s3jZRQQ9dAP8_DB4OKmU16w/viewform?usp=sf_link">Form for feedback or suggestions</a>
        </div>
      </ul>
    </div>
  );
}

export default ModalHowContent;