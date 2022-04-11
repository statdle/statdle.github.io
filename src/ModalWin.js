import React from "react";

/*props: 
history
guessCount
toggleModalOff */
class ModalWin extends React.Component {
  constructor(props) {
    super(props);
    this.share = this.share.bind(this);

    this.state = {
      shareActive: false,
    };
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

    let fillerText = " Guesses";
    if (this.props.guessCount === 1) {
      fillerText = " Guess";
    }

    return (
      <>
        <h1 className="text-center">
          {this.props.history.length + " " + fillerText}
        </h1>

        {shareActive}
        <div className="btn-wide" onClick={this.share}>
          Share
        </div>
        <div className="btn-wide">Reset</div>

        <div className="country-guess-container">{display}</div>
      </>
    );
  }
}

export default ModalWin;
