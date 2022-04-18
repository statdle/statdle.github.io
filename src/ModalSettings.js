import React from "react";
import Modal from "./Modal";

const ModalSettings = (props) => {
  return (
    <>
      <a
        className="country-guess"
        href="https://www.sporcle.com/games/needapausebutton/country-ranking-showdown"
      >
        play this sporcle quiz
      </a>
      <h2 className="mag-top">Things I want to add</h2>
      <ul>
        <li>
          Better search detection of countries; you cant submit/be suggested
          already inputed/wrongly spelt
        </li>
        <li>Redoing the coord data</li>
        <li>restrictions on countries</li>
      </ul>
    </>
  );
};

export default ModalSettings;
