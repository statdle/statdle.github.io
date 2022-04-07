import React from "react";

// refactor this

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.share = this.share.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);

    this.state = {
      shareActive: false,
    };
  }

  stopPropagation(e) {
    e.stopPropagation();
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

    this.setState({
      shareActive: true,
    });
  }

  render() {
    const display = Object.entries(this.props.history).map((key) => {
      return (
        <div key={key[1].country} className="country-guess">
          {key[1].country}
        </div>
      );
    });

    const shareActive = this.state.shareActive ? (
      <div className="text-center mag-top">Copied!</div>
    ) : null;

    const types = {
      how: (
        <>
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
        </>
      ),

      settings: (
        <>
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
        </>
      ),

      win: (
        <>
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

          {shareActive}
          <div className="btn-wide" onClick={this.share}>
            Share
          </div>
          <div className="btn-wide">Reset</div>

          <div className="country-guess-container">{display}</div>
        </>
      ),
    };

    return (
      <div
        className="modal-backing"
        onClick={() => this.props.toggleModalOff()}
      >
        <div className="modal-content" onClick={this.stopPropagation}>
          {types[this.props.modalType]}
        </div>
      </div>
    );
  }
}

export default Modal;
