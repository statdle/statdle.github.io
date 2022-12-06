import React from "react";
import ModalHowExamples from "./ModalHowExamples";

const ModalHowContent = () => {

  return (
    <div className="how-container">
      <h1 className="modal__subtitle">
        Find the Secret Country using Statistics!<br></br>A new game everyday!
      </h1>
      <ModalHowExamples />

      <ul className="modal__text">
        <li>Click on the category or a country to reveal information</li>
        <li className="modal--link"><a href="https://docs.google.com/forms/d/e/1FAIpQLSf9NfB5E7mMjUAhYh-GrwS8uS1s3jZRQQ9dAP8_DB4OKmU16w/viewform?usp=sf_link">Form for feedback and suggestions ↗</a></li>
      </ul>

    </div>

  );
}

export default ModalHowContent;