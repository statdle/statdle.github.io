import React from "react";

import Search from "./views/Search";
import Display from "./views/Display";
import Top from "./views/Top";

import ModalHow from "./components/modal/ModalHow";
import ModalWin from "./components/modal/ModalWin";
import Popup from "./components/Popup";

import "./App.css";
import data from "./assets/data.json";
import catagoryNames from "./assets/catagoryNames.json";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.doSearch = this.doSearch.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.setupStats = this.setupStats.bind(this);
    this.setupGame = this.setupGame.bind(this);
    this.doRandom = this.doRandom.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.updateStorageGame = this.updateStorageGame.bind(this);
    this.updateStorageStats = this.updateStorageStats.bind(this);

    this.state = {
      catagories: {}, // {<catagoryname>: {high: <0>, highName: <"">, low: <0> lowName: <""> target: <0>, lineThing: <0,1,2>}, ...}
      history: [], //{<country>, <country>, ...}
      guessHistory: [0, 0, 0, 0],
      modalType: 1, //0: "none", 1: "how" 2: "win from top" 3: "win"
      popupType: 0, //0: "none", 1: "Already Guessed", 2: "Invalid Country", 3: "Copied to Clipboard"
      finalState: {},
      win: false,
    };
  }

  componentDidMount() {
    localStorage.clear();
    this.setupStats();
    this.setupGame();
  }

  setupStats() {
    console.log("--- setupStats");
    if (!localStorage.getItem("stats")) {
      //set up stats
      const stats = {
        rounds: 0,
        best: 0,
        average: 0,
      };

      localStorage.setItem("stats", JSON.stringify(stats));
    }
  }

  /* pick target country and catagories */
  setupGame() {
    console.log("--- setupGame");
    let today = new Date().setHours(0, 0, 0, 0);
    
    // if existing game in localStorage, set values
    if (localStorage.getItem("game")) {
      const game = JSON.parse(localStorage.getItem("game"));
      if (parseInt(game.date) === parseInt(today)) {
        this.setState({
          catagories: game.catagories,
          history: game.history,
          score: game.score,
          guessHistory: game.guessHistory,
          finalState: game.finalState,
          win: game.win,
          modalType: 0,
        });
        return;
      }
    }

    // Generate randomness from todays date
    const seedrandom = require("seedrandom");
    const gen = seedrandom(today);
    const countryRandIndex = Math.floor(gen() * data.length); //country randomizer

    // Select target country, 4 catagories
    const targetCountry = data[countryRandIndex];
    const seeds = this.doRandom(
      4,
      Object.keys(catagoryNames).length,
      today,
      seedrandom
    );

    // Generate inital state values
    const initialCatagories = {};
    for (let i in seeds) {
      var key = Object.keys(catagoryNames)[seeds[i]];
      initialCatagories[key] = {
        target: targetCountry[key],
        high: "",
        highName: "",
        low: "",
        lowName: "",
        lineThing: 0,
      };
    }

    //set initial state
    this.setState({
      catagories: initialCatagories,
    });

    this.updateStorageGame(initialCatagories, [], [], false, {}, today);
  }

  // update state, update display
  updateDisplay(countryData) {
    console.log("--- updateDisplay");
    let check = Object.entries(this.state.catagories)[0]; //used to check if target
    let newCatagories = {...this.state.catagories}; //we fill this instead of repeatedly calling state
    let newHistory = this.state.history; //history stores what gets inputed
    let newGuessHistory = this.state.guessHistory;
    newHistory.push(countryData.name);

     //win condtion
    if (countryData[check[0]] === check[1].target) {
      this.setState((state) => {
        return {finalState: state.catagories}
      });

      this.updateStorageStats(newHistory.length);
      this.toggleModal(3);

      for (let i in Object.keys(this.state.catagories)) {
        var keyWin = Object.keys(this.state.catagories)[i];
        const catagory = this.state.catagories[keyWin];
        newCatagories[keyWin] = {
          target: catagory.target,
          high: catagory.target,
          highName: countryData.name,
          low: catagory.target,
          lowName: countryData.name,
          lineThing: 0,
        };
        newGuessHistory[i] += 1;
      }
      
      this.setState({
        catagories: newCatagories,
        history: newHistory,
        guessHistory: newGuessHistory,
      });
      
      this.updateStorageGame(newCatagories, newHistory, newGuessHistory, true, newCatagories);
      return;
    }

    //loop through data catagories; name, pop, area, ...
    for (let i in Object.keys(this.state.catagories)) {
      var key = Object.keys(this.state.catagories)[i];

      const catagory = newCatagories[key];
      const rank = parseInt(countryData[key]);
      const target = parseInt(catagory.target);

      //1: if new is higher rank
      if (rank < target) {
        if (catagory.high === "" || rank > catagory.high) {
          newCatagories[key].high = rank;
          newCatagories[key].highName = countryData.name;
          newGuessHistory[i] += 1;
        } else {
          newCatagories[key].lineThing = 1;
        }
      //2: if new is lower rank
      } else if (rank > target) {
        if (catagory.low === "" || rank < catagory.low) {
          newCatagories[key].low = rank;
          newCatagories[key].lowName = countryData.name;
          newGuessHistory[i] += 1;
        } else {
          newCatagories[key].lineThing = 2;
        }
      }
    }

    this.setState({
      catagories: newCatagories,
      history: newHistory,
      guessHistory: newGuessHistory,
    });

    this.updateStorageGame(newCatagories, newHistory, newGuessHistory, false);
  }

  updateStorageStats(score) {
    let stats = JSON.parse(localStorage.getItem("stats"));
    let best = stats.best;
    let average = stats.average;
    let rounds = stats.rounds;

    // update best
    if (score < best || best === 0) {
      best = score;
    }

    // update average
    average = Math.round(((average * rounds + score) / (rounds + 1)) * 10) / 10;
    rounds = rounds + 1;

    stats = {
      rounds: rounds,
      best: best,
      average: average,
    };

    localStorage.setItem("stats", JSON.stringify(stats));
  }

  /* newCatagories, newHistory, newWin, finalState (conditional)*/
  updateStorageGame(newCatagories, newHistory, newGuessHistory, newWin = false, finalGame = {}, date = 0) {

    //if it exists 
    const game = JSON.parse(localStorage.getItem("game")) ?? {};
    game.catagories = newCatagories;
    game.history = newHistory;
    game.guessHistory = newGuessHistory;
    game.win = newWin;
    game.finalGame = finalGame;
    game.date = (date !== 0 && !game.date)? date : game.date;

    localStorage.setItem("game", JSON.stringify(game));
  }

  //little popup box display
  togglePopup(type = 0) {
    this.setState({
      popupType: type,
    });
  }

  //show "already entered" popup
  doSearch(inp) {
    let searchTerm = inp.toLowerCase();
    for (let i in this.state.history) {
      if (searchTerm === this.state.history[i].toLowerCase()) {
        this.togglePopup(1);
        return;
      }
    }

    for (let i in data) {
      if (searchTerm === data[i].name.toLowerCase()) {
        this.updateDisplay(data[i]);
        return;
      }
    }
    this.togglePopup(2);
  }

  /* changes modal display
  input: 0: "none", 1: "how" 2: "settings" 3: "win"
  */
  toggleModal(type = 0) {
    this.setState({
      modalType: type,
    });
  }

  /* generate ordered random values */
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

  render() {
    let modalDisplay = null;
    switch (this.state.modalType) {
      case 0:
        break;
      case 1:
        modalDisplay = <ModalHow toggleModal={this.toggleModal} />;
        break;
      case 2:
        modalDisplay = (
          <ModalWin
            toggleModal={this.toggleModal}
            togglePopup={this.togglePopup}
            history={this.state.history}
            catagories={this.state.finalState}
            special={false}
            win={this.state.win}
            guessHistory={this.state.guessHistory}
          />
        );
        break;
      case 3:
        modalDisplay = (
          <ModalWin
            toggleModal={this.toggleModal}
            togglePopup={this.togglePopup}
            history={this.state.history}
            catagories={this.state.finalState}
            special={true}
            win={true}
            guessHistory={this.state.guessHistory}
          />
        );
        break;
      default:
        break;
    }

    const popupDisplay = this.state.popupType ? <Popup display={this.state.popupType} togglePopup={this.togglePopup}/> : null;

    return (
      <>
        {popupDisplay}
        {modalDisplay}
        <Top
          guessCount={this.state.history.length}
          toggleModal={this.toggleModal}
        />
        <Display
          values={this.state.catagories}
          currentCountry={this.state.history[this.state.history.length - 1]}
        />
        <Search doSearch={this.doSearch} win={this.state.win} />
      </>
    );
  }
}

export default App;
