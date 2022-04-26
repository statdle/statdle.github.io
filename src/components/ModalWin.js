import React from "react";
import catagoryNames from "../assets/catagoryNames.json";
import StatsDisplay from "../components/StatsDisplay";
import WinCountries from "./WinCountries";

/*props: 
catagories: 
history... ["Uzbekistan", "Singapore", "Bangladesh", "Malaysia… */
class ModalWin extends React.Component {
  constructor(props) {
    super(props);

    this.share = this.share.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
    this.getNumber = this.stopPropagation.bind(this);

    this.state = {
      shareActive: false,
    };
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

    var text =
      "Nerdle " +
      gameNumber +
      ": " +
      this.props.history.length +
      fillerText +
      "\n\nlast guess range - category\n";

    console.log(this.props.catagories);
    Object.entries(this.props.catagories).forEach((key) => {
      text += "↓↑ ";
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
    text += "\nhttps://9ps.github.io/statdle/";
    navigator.clipboard.writeText(text);

    this.setState({
      shareActive: true,
    });
  }

  render() {
    let stats = JSON.parse(localStorage.getItem("stats"));
    let content;

    if (this.props.win) {
      //share buttons
      const shareActive = this.state.shareActive ? (
        <div className="text-center mag-top">Copied to Clipboard!</div>
      ) : null;

      let fillerText = " Guesses";
      if (this.props.history.length === 1) {
        fillerText = " Guess";
      }

      content = (
        <>
          <h1 className="text-center">
            {this.props.history.length + " " + fillerText}
          </h1>
          {shareActive}
          <div className="btn-wide btn-modal btn-active" onClick={this.share}>
            Share
          </div>
          <StatsDisplay stats={stats} />
          <WinCountries history={this.props.history} />
        </>
      );
    } else {
      content = (
        <>
          <StatsDisplay stats={stats} />
          <p className="results-text">
            (finish playing the round for sharing options)
          </p>
        </>
      );
    }

    return (
      <div
        className={
          this.props.special
            ? "modal-backing modal-backing-special"
            : "modal-backing"
        }
        onClick={() => this.props.toggleModal()}
      >
        <div
          className={
            this.props.special
              ? "modal-content modal-content-special"
              : "modal-content"
          }
          onClick={this.stopPropagation}
        >
          <div className="modal-title">
            <h2>Results</h2>
            <span
              className="material-icons btn"
              onClick={() => this.props.toggleModal()}
            >
              close
            </span>
          </div>
          <div className="modal-body">{content}</div>
        </div>
      </div>
    );
  }
}

export default ModalWin;
