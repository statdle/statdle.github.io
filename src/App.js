import React from "react";

import Search from "./views/Search";
import Display from "./views/Display";
import Top from "./views/Top";

import ModalHow from "./components/ModalHow";
import ModalSettings from "./components/ModalSettings";
import ModalWin from "./components/ModalWin";
import Popup from "./components/Popup";

import "./App.css";
import data from "./assets/data.json";
import catagoryNames from "./assets/catagoryNames.json";

// import Popup from "./Popup";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.doSearch = this.doSearch.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.seedValues = this.seedValues.bind(this);
    this.doRandom = this.doRandom.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.doPopup = this.doPopup.bind(this);

    this.state = {
      catagories: {}, // {<catagoryname>: {high: <0>, highName: <"">, low: <0> lowName: <""> target: <0>, lineThing: <0,1,2>}, ...}
      history: [], //{<country>, <country>, ...}
      modalType: 1, //0: "none", 1: "how" 2: "settings" 3: "win"
    };
  }

  componentDidMount() {
    this.seedValues();
  }

  /* generate ordered random values
  number: amount of returns
  range: total 0-N
  seed: seed for randomness
  */
  doRandom(number, range, seed, seedrandom) {
    var retArr = [];
    for (let i = 0; i < range; i++) {
      retArr.push(i);
    }

    while (retArr.length > number) {
      var rand = seedrandom(seed + retArr.length);
      retArr.splice(Math.floor(rand() * retArr.length), 1);
    }
    return retArr;
  }

  /* pick target country and catagories */
  seedValues() {
    // Generate randomness from todays date
    const seedrandom = require("seedrandom");
    const date = new Date(); //used for seeding date
    const gen = seedrandom(date.toDateString());
    const countryRandIndex = Math.floor(gen() * data.length); //country randomizer

    // Select target country
    const targetCountry = data[countryRandIndex];
    // console.log(targetCountry);

    // Select which 4 catagories
    const seeds = this.doRandom(
      4,
      Object.keys(catagoryNames).length,
      date.toDateString(),
      seedrandom
    );

    // Generate inital state values
    const initialState = {};
    for (let i in seeds) {
      var key = Object.keys(catagoryNames)[seeds[i]];
      initialState[key] = {
        target: targetCountry[key],
        high: "",
        highName: "\u00A0",
        low: "",
        lowName: "\u00A0",
        lineThing: 0,
      };
    }

    //set initial state
    this.setState({
      catagories: initialState,
    });
  }

  /* update state, update display */
  updateDisplay(countryData) {
    const check = Object.entries(this.state.catagories)[0];
    const newState = {}; //we fill this instead of repeatedly calling state
    //history stores what gets inputed, and changed
    const newHistory = this.state.history;
    newHistory.push(countryData.name);

    if (countryData[check[0]] === check[1].target) {
      const finalState = this.state.catagories;

      this.setState({
        finalState: finalState,
      });

      this.toggleModal(3); //win condtion

      for (let i in Object.keys(this.state.catagories)) {
        var keyWin = Object.keys(this.state.catagories)[i];
        const catagory = this.state.catagories[keyWin];
        newState[keyWin] = {
          target: catagory.target,
          high: countryData[keyWin],
          highName: countryData.name,
          low: countryData[keyWin],
          lowName: countryData.name,
          lineThing: 0,
        };
      }

      this.setState({
        catagories: newState,
        history: newHistory,
      });

      return;
    }

    //loop through data catagories; name, pop, area,
    for (let i in Object.keys(this.state.catagories)) {
      var key = Object.keys(this.state.catagories)[i];

      const catagory = this.state.catagories[key];
      const rank = countryData[key];

      newState[key] = {
        target: catagory.target,
        high: "",
        highName: "",
        low: "",
        lowName: "",
        lineThing: 0,
      }; //adding new blank row

      if (rank < catagory.target) {
        //1: higher rank
        if (catagory.high === "" || rank > catagory.high) {
          newState[key].high = rank;
          newState[key].highName = countryData.name;
        } else {
          newState[key].high = catagory.high;
          newState[key].highName = catagory.highName;
          newState[key].lineThing = 2;
        }
        newState[key].low = catagory.low;
        newState[key].lowName = catagory.lowName;
      } else if (rank > catagory.target) {
        //2: lower rank
        if (catagory.low === "" || rank < catagory.low) {
          newState[key].low = rank;
          newState[key].lowName = countryData.name;
        } else {
          newState[key].low = catagory.low;
          newState[key].lowName = catagory.lowName;
          newState[key].lineThing = 1;
        }
        newState[key].high = catagory.high;
        newState[key].highName = catagory.highName;
      }
    }

    // Update State
    this.setState({
      catagories: newState,
      history: newHistory,
    });
  }

  doPopup(text) {
    this.setState({
      popupText: text,
    });
  }

  doSearch(inp) {
    let searchTerm = inp.toLowerCase();
    for (let i in this.state.history) {
      if (searchTerm === this.state.history[i].toLowerCase()) {
        this.doPopup("Already Entered!");
        return;
      }
    }

    for (let i in data) {
      if (searchTerm === data[i].name.toLowerCase()) {
        this.updateDisplay(data[i]);
        return;
      }
    }
    this.doPopup("Unknown Country!");
  }

  /* changes modal display
  input: 0: "none", 1: "how" 2: "settings" 3: "win"
  */
  toggleModal(type = 0) {
    this.setState({
      modalType: type,
    });
  }

  render() {
    let modalDisplay = null;
    switch (this.state.modalType) {
      case 0:
        modalDisplay = null;
        break;
      case 1:
        modalDisplay = <ModalHow toggleModal={this.toggleModal} />;
        break;
      case 2:
        modalDisplay = <ModalSettings toggleModal={this.toggleModal} />;
        break;
      case 3:
        modalDisplay = (
          <ModalWin
            toggleModal={this.toggleModal}
            history={this.state.history}
            catagories={this.state.finalState}
          />
        );
        break;
      default:
        break;
    }

    return (
      <>
        <Popup text={this.state.popupText} />
        {modalDisplay}
        <Top
          guessCount={this.state.history.length}
          toggleModal={this.toggleModal}
        />
        <Display
          values={this.state.catagories}
          currentCountry={this.state.history[this.state.history.length - 1]}
        />
        <Search doSearch={this.doSearch} />
      </>
    );
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.setState({ popupText: "" });
    }, 6000);
  }
}

export default App;
