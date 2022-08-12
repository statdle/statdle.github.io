import React from "react";
import StatsDisplay from "./StatsDisplay";
import WinCountries from "./WinCountries";
import './modalWin.scss';
import Close from '../../assets/icons/close.svg';
import Twemoji from '../../assets/Twemoji.js'

const num = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣"];
const col = ["🟪", "🟦", "🟩", "🟨", "🟧", "🟥"];
const FocusTrap = require('focus-trap-react');


class ModalWin extends React.Component {
  constructor(props) {
    super(props);

    this.share = this.share.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);

  }


  stopPropagation(e) {
    if (e) {
      e.stopPropagation();
    }
  }


  /* what is returned when share clicked */
  share(e) {
    // Get day of challenge
    const start = new Date("April 20, 2022 00:00:00");
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const history = this.props.history;

    const gameNumber = (today - start) / 86400000;
    const guessAmount = this.props.win ? history.length : "X";
    var text = "#Statdle " + gameNumber + "\n" + guessAmount + "/10 Guesses\n";



    // need to loop through both catagories, and 

    for (let i = 0; i < history.length; i++) {
      text += num[history[i].correct];
      for (let j = 0; j < history[i].range.length; j++) {
        let difference = history[i].range[j];
        if (difference === 0) {
          text += col[0];
        } else if (difference <= 10) {
          text += col[1];
        } else if (difference <= 25) {
          text += col[2];
        } else if (difference <= 50) {
          text += col[3];
        } else if (difference <= 100) {
          text += col[4];
        } else if (difference > 100) {
          text += col[5];
        }
      }
      text += "\n";
    }

    text += "\nstatdle.github.io/";

    navigator.clipboard.writeText(text);
    this.props.togglePopup(3);
  }

  render() {
    let stats = JSON.parse(localStorage.getItem("stats"));
    let content;

    if (this.props.ended) {
      let fillerText = "";
      if (this.props.win) {
        fillerText += this.props.history.length;
        fillerText += this.props.history.length === 1 ? " Guess" : " Guesses";
      } else {
        fillerText = this.props.targetCountry;
      }

      content = (
        <>
          <h2 className="guess-count">
            {fillerText}
          </h2>
          <button className="btn btn--wide btn--active" onClick={this.share}>
            Share
          </button>
          <details className="info">
            <summary className="info__summary">Share content symbolism</summary>
            <p className="info__text">Per Guess:</p>

            <p className="info__text">
              <Twemoji className="emoji" emoji={num[0]} />
              <Twemoji className="emoji" emoji={num[1]} />
              <Twemoji className="emoji" emoji={num[2]} />
              <Twemoji className="emoji" emoji={num[3]} />
              <Twemoji className="emoji" emoji={num[4]} />
            </p>
            <p className="info__text">
              Amount of catagories with new information</p>

            <p className="info__text">
              <Twemoji className="emoji" emoji={col[5]} />
              <Twemoji className="emoji" emoji={col[4]} />
              <Twemoji className="emoji" emoji={col[3]} />
              <Twemoji className="emoji" emoji={col[2]} />
              <Twemoji className="emoji" emoji={col[1]} />
              <Twemoji className="emoji" emoji={col[0]} />
            </p>
            <p className="info__text">
              Rank range of a catagory, where red is a rank range of {">"} 100, and purple is 0</p>
          </details>
          <StatsDisplay stats={stats} />
          <WinCountries history={this.props.history} win={this.props.win} />
        </>
      );
    } else {
      content = (
        <>
          <StatsDisplay stats={stats} />
          <WinCountries history={this.props.history} win={false} />
          <p className="info__text">
            (finish playing the round for sharing options)
          </p>
        </>
      );
    }

    return (
      <FocusTrap>
        <div
          className={"modal-backing" +
            (this.props.special
              ? " modal-backing--special"
              : ""
            )}
          onClick={() => this.props.toggleModal()}
        >
          <div
            className={"modal" +
              (this.props.special
                ? " modal--special"
                : ""
              )}
            onClick={this.stopPropagation}
          >
            <div className="modal__title">
              <h2>Results</h2>
              <button className="btn btn--icon" onClick={() => this.props.toggleModal()}>
                <img className="icons" src={Close} alt="Close" aria-label="close" />
              </button>
            </div>
            <div className="modal__body">{content}</div>
          </div>
        </div>
      </FocusTrap>
    );
  }
}

export default ModalWin;
