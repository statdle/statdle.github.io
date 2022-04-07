import React from "react";

// refactor this

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.share = this.share.bind(this);
  }
  share() {
    let fillerText = " Guesses \n\n";
    if (this.props.history.length === 1) {
      fillerText = " Guess \n\n";
    }
    var text = "Nerdle: " + this.props.history.length + fillerText;

    Object.entries(this.props.history).map((key) => {
      for (let i in key[1].values) {
        text += key[1].values[i];
      }
      text += "\n";
    });
    navigator.clipboard.writeText(text);
  }

  render() {
    const display = Object.entries(this.props.history).map((key) => {
      return (
        <div key={key[1].country} className="country-guess">
          {key[1].country}
        </div>
      );
    });

    const types = {
      how: (
        <div className="modal-content">
          <div className="modal-title">
            <h2>How to Play</h2>
            <span
              className="material-icons btn"
              onClick={() => this.props.toggleModalOff()}
            >
              close
            </span>
          </div>
          <p>
            Guess the unknown country, by guessing countries. Guessing a country
            will reveal its rank on 4 random data points. The closest rank above
            and below to the unknown country is displayed.
          </p>
          <b>Example</b>
          <div className="onboard-example">
            <h2 className="catagory-title">Alphabetically</h2>
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
            The guess Austria is 10th alphabetically, while San Marino is 149th.
            Hence the unknown country is inbetween rank 10 and 149.
          </p>
        </div>
      ),

      settings: (
        <div className="modal-content">
          <div className="modal-title">
            <h2>Settings</h2>
            <span
              className="material-icons btn"
              onClick={() => this.props.toggleModalOff()}
            >
              close
            </span>
          </div>
          <p>Coming Soon</p>
        </div>
      ),

      win: (
        <div className="modal-content">
          <div className="modal-title">
            <h2>Results</h2>
            <span
              className="material-icons btn"
              onClick={() => this.props.toggleModalOff()}
            >
              close
            </span>
          </div>
          <h1 className="text-center">{this.props.history.length} Guesses</h1>
          <div className="country-guess-container">{display}</div>

          <div className="top-nav">
            <p className="btn" onClick={this.share}>
              Share
            </p>
            <p className="btn">Reset</p>
          </div>
        </div>
      ),
    };

    return (
      <div
        className="modal-backing"
        onClick={() => this.props.toggleModalOff()}
      >
        {types[this.props.modalType]}
      </div>
    );
  }
}

export default Modal;
