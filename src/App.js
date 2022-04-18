import React from "react";
import "./App.css";
import Search from "./Search";
import Display from "./Display";
import Top from "./Top";
import Modal from "./Modal";
import Popup from "./Popup";
import data from "./data.json";
import catagoryNames from "./catagoryNames.json";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.doSearch = this.doSearch.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.seedValues = this.seedValues.bind(this);
    this.doRandom = this.doRandom.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalOff = this.toggleModalOff.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      catagories: {},
      history: [],
      showModal: true,
      modalType: "how",
    };
  }

  componentDidMount() {
    this.seedValues();
  }

  reset() {
    this.toggleModalOff();
    this.seedValues();
  }

  // generate ordered random values
  doRandom(number, range) {
    var retArr = [];
    for (let i = 0; i < range; i++) {
      retArr.push(i);
    }
    while (retArr.length > number) {
      var r = Math.floor(Math.random() * retArr.length);
      retArr.splice(r, 1);
    }
    return retArr;
  }

  // startup pick target country and catagories
  seedValues() {
    // Select target country
    const targetCountry = data[Math.floor(Math.random() * data.length)];
    // console.log(targetCountry);

    // Select which 4 catagories
    const seeds = this.doRandom(4, Object.keys(catagoryNames).length);

    //generate inital state values
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
      history: [],
    });
  }

  updateDisplay(countryData) {
    const check = Object.entries(this.state.catagories)[0];

    if (countryData[check[0]] === check[1].target) {
      this.toggleModal("win");
      return;
    }

    const newState = {}; //we fill this instead of repeatedly calling state

    //history stores what gets inputed, and changed
    const newHistory = this.state.history;
    newHistory.push(countryData.name);

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

  doSearch(searchTerm) {
    for (let v in data) {
      if (data[v].name.toLowerCase() === searchTerm.toLowerCase()) {
        this.updateDisplay(data[v]);
        return 0;
      }
    }
    return 1;
  }

  toggleModal(type) {
    const modalValue = !this.state.showModal;
    this.setState({
      showModal: modalValue,
      modalType: type,
    });
  }

  toggleModalOff() {
    const modalValue = !this.state.showModal;
    this.setState({
      showModal: modalValue,
    });
  }

  render() {
    return (
      <>
        {this.state.showModal ? (
          <Modal
            toggleModalOff={this.toggleModalOff}
            modalType={this.state.modalType}
            history={this.state.history}
            catagories={this.state.catagories}
            reset={this.reset}
          />
        ) : null}
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
}

export default App;
