import React from "react";
import catagoryNames from "../assets/catagoryNames.json";

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
      "\n\nRANGE - CATAGORY\n";

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
    text += "\nhttps://9ps.github.io/nerdle/";
    navigator.clipboard.writeText(text);

    this.setState({
      shareActive: true,
    });
  }

  render() {
    const display = Object.entries(this.props.history).map((key, value) => {
      if (key[0] === "3" && this.props.history.length > 10) {
        return (
          <div key={key[0] + value[0]} className="country-guess">
            ...
          </div>
        );
      } else if (key[0] > 3 && key[0] < this.props.history.length - 5) {
        return <></>;
      } else {
        return (
          <div key={key[0] + value[0]} className="country-guess">
            {key[1]}
          </div>
        );
      }
    });

    const shareActive = this.state.shareActive ? (
      <div className="text-center mag-top">Copied!</div>
    ) : null;

    let fillerText = " Guesses";
    if (this.props.history.length === 1) {
      fillerText = " Guess";
    }

    return (
      <div
        className="modal-backing modal-backing-special"
        onClick={() => this.props.toggleModal()}
      >
        <div
          className="modal-content modal-content-special"
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
          <div className="modal-body">
            <h1 className="text-center">
              {this.props.history.length + " " + fillerText}
            </h1>

            {shareActive}
            <div className="btn-wide btn-modal" onClick={this.share}>
              Share
            </div>

            <div className="country-guess-container">{display}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWin;
