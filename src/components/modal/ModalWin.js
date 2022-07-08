import React from "react";
import catagoryNames from "../../assets/catagoryNames.json";
import StatsDisplay from "./StatsDisplay";
import WinCountries from "./WinCountries";
import './modalWin.scss';
/*props: 
catagories: 
history... ["Uzbekistan", "Singapore", "Bangladesh", "Malaysia… */
class ModalWin extends React.Component {
  constructor(props) {
    super(props);

    this.share = this.share.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
    this.getNumber = this.stopPropagation.bind(this);
  }

  stopPropagation(e) {
    if (e) {
      e.stopPropagation();
    }
  }

  /* what is returned when share clicked */
  share(e) {
    let fillerText = " Guesses";
    if (this.props.history.length === 1) {
      fillerText = " Guess";
    }

    // Get day of challenge
    const start = new Date("April 20, 2022 00:00:00");
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const gameNumber = (today - start) / 86400000;
    const guessAmount = this.props.history.length;

    var text =
      "#Statdle " +
      gameNumber +
      ": " +
      guessAmount +
      fillerText +
      "\n\n🟪 Guesses, Range, Category\n";

    // need to loop through both catagories, and 
    const guessHistory = this.props.guessHistory;
    Object.entries(this.props.catagories).forEach((key, index) => {
      text += Math.floor(guessHistory[index] * 100 / guessAmount);
      text += "% 🟪 ↓↑ ";
      const high = key[1].high;
      const low = key[1].low;
      if (high === "" && low === "") {
        text += 194;
      } else if (low === "") {
        text += 194 - high;
      } else if (high === "") {
        text += low;
      } else {
        text += low - high;
      }
      text += " - " + catagoryNames[key[0]] + "\n";
    });
    text += "\nhttps://statdle.github.io/";
    navigator.clipboard.writeText(text);
    this.props.togglePopup(3);
  }

  render() {
    let stats = JSON.parse(localStorage.getItem("stats"));
    let content;

    if (this.props.win) {
      //share buttons

      let fillerText = " Guesses";
      if (this.props.history.length === 1) {
        fillerText = " Guess";
      }

      content = (
        <>
          <p className="guess-count">
            {this.props.history.length + " " + fillerText}
          </p>
          <button tabindex="0" className="btn btn--wide btn--active" onClick={this.share}>
            Share
          </button>
          <StatsDisplay stats={stats} />
          <WinCountries history={this.props.history} win={true} />
        </>
      );
    } else {
      content = (
        <>
          <StatsDisplay stats={stats} />
          <WinCountries history={this.props.history} win={false} />
          <p className="results-text">
            (finish playing the round for sharing options)
          </p>
        </>
      );
    }

    return (
      <div
        className={"modal-backing" +
          (this.props.special
            ? " modal-backing-special"
            : ""
          )}
        onClick={() => this.props.toggleModal()}
      >
        <body
          className={"modal-content" +
            (this.props.special
              ? " modal-content-special"
              : ""
            )}
          onClick={this.stopPropagation}
        >
          <div className="modal__title">
            <h2>Results</h2>
            <button
              className="material-icons btn"
              onClick={() => this.props.toggleModal()}
            >
              close
            </button>
          </div>
          <div className="modal-body">{content}</div>
        </body>
      </div>
    );
  }
}

export default ModalWin;
