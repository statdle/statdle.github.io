import React from "react";

/*props: 
catagories: 
history... ["Uzbekistan", "Singapore", "Bangladesh", "Malaysia…
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
    let fillerText = " Guesses";
    if (this.props.history.length === 1) {
      fillerText = " Guess!";
    }
    var text = "Nerdle: " + this.props.history.length + fillerText + "\n";
    text +=
      "Unknown Country: " +
      this.props.history[this.props.history.length - 1] +
      "\n\n";

    Object.entries(this.props.catagories).map((key) => {
      text += catagoryNames[key[0]] + "\n";
      if (key[1].high) {
        text += "↓ #" + key[1].high + "\n";
      } else {
        text += "↓ #---\n";
      }
      if (key[1].low) {
        text += "↑ #" + key[1].low + "\n\n";
      } else {
        text += "↑ #---\n\n";
      }
    });

    navigator.clipboard.writeText(text);

    this.setState({
      shareActive: true,
    });
  }

  render() {
    const display = Object.entries(this.props.history).map((key, value) => {
      if (key[0] === "3" && this.props.history.length > 10) {
        return (
          <div key={key[0]} className="country-guess">
            ...
          </div>
        );
      } else if (key[0] > 3 && key[0] < this.props.history.length - 5) {
        return;
      } else {
        return (
          <div key={key[0]} className="country-guess">
            {key[1]}
          </div>
        );
      }
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
        <div className="btn-wide" onClick={this.props.reset}>
          Reset
        </div>

        <div className="country-guess-container">{display}</div>
      </>
    );
  }
}

const catagoryNames = {
  alpha: "Alphabetically",
  pop: "Population",
  area: "Area",
  density: "Density",
  gdp: "GDP",
  gdpc: "GDP Per Capita",
  calpha: "Capital Cities Alphabetically",
  latt: "Capital Latitude (North -> South)",
  long: "Capital Longitude (Anti Meridian -> East)",
};

export default ModalWin;
