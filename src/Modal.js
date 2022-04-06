import React, { Component } from "react";

const Modal = (props) => {
  return (
    <div className="modal-backing" onClick={() => props.toggleModal()}>
      <div className="modal-content">
        <div className="modal-title">
          <h2>How to Play</h2>
          <span
            className="material-icons btn"
            onClick={() => props.toggleModal()}
          >
            close
          </span>
        </div>
        <p>
          Guess the unknown country, by guessing countries. For each random 4
          data points, the closest rank above and below of guessed countries are
          displayed.
        </p>
        <h2>Example</h2>
        <div className="onboard-example">
          <h1 className="catagory-title">Alphabetically</h1>
          <div className="line-row">
            <span className="rank-number active">↓ 10</span>
            <span className="country-name active">Austria</span>
          </div>
          <div className="line-row">
            <span className="rank-number">↑</span>
            <span className="country-name">{"\u00A0"}</span>
          </div>
        </div>

        <p>
          The guess Austria is 20th alphabetically, ranked higher than the
          unknown country.
        </p>

        <div className="onboard-example">
          <h1 className="catagory-title">Alphabetically</h1>
          <div className="line-row">
            <span className="rank-number">↓ 10</span>
            <span className="country-name">Austria</span>
          </div>
          <div className="line-row">
            <span className="rank-number active">↑ 149</span>
            <span className="country-name active">San Marino</span>
          </div>
        </div>

        <p>
          The guess San Marino is 149th alphabetically, ranked lower than the
          unknown country.
        </p>
      </div>
    </div>
  );
};

export default Modal;
