import React from "react";
import ModalHowExamples from "./ModalHowExamples";

const ModalHowContent = () => {

  return (
    <div className="how-container">
      <h1>
        Find the Secret Country using Statistics! A new game everyday!
      </h1>
      <ul className="modal__text">
        <li>You are given 4 random catagories to help you figure out what the secret country is</li>
        <li>Guessing any country will reveal it's rank among each category, and if that rank is above or below the secret country</li>
      </ul>
      <h2 className="modal__subtitle">Example</h2>
      <ModalHowExamples />
      <ul className="modal__text">
        <li>For more information on a catagory, click on the catagory name</li>
        <li>For the value of a country, click on the country name</li>
        <li className="modal--link"><a href="https://docs.google.com/forms/d/e/1FAIpQLSf9NfB5E7mMjUAhYh-GrwS8uS1s3jZRQQ9dAP8_DB4OKmU16w/viewform?usp=sf_link">Form for feedback and suggestions ↗</a></li>
      </ul>
    </div>

  );
}

export default ModalHowContent;