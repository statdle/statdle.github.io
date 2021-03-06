import React from "react";

import Search from "./views/Search";
import Display from "./views/Display";
import Top from "./views/Top";

import ModalHow from "./components/how/ModalHow";
import ModalWin from "./components/modal/ModalWin";
import Popup from "./components/popup/Popup";

import "./styles/_defaults.scss";
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
    this.seedCatagories = this.seedCatagories.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.updateStorageGame = this.updateStorageGame.bind(this);
    this.updateStorageStats = this.updateStorageStats.bind(this);

    this.state = {
      catagories: {}, // {<catagoryname>: {high: <0>, highName: <"">, low: <0> lowName: <""> target: <0>, activeRow: <0>}, ...}
      history: [], //{<country>, <country>, ...}
      guessHistory: [0, 0, 0, 0],
      modalType: 1, //0: "none", 1: "how" 2: "win from top" 3: "win"
      popupType: 0, //0: "none", 1: "Already Guessed", 2: "Invalid Country", 3: "Copied to Clipboard"
      finalGame: {},
      win: false,
    };
  }

  componentDidMount() {
    this.setupStats();
    this.setupGame();
  }

  setupStats() {
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
    // let today = new Date().setHours(0, 0, 0, 0);
    let today = new Date().toDateString();

    // if existing game in localStorage, set values
    if (localStorage.getItem("game")) {
      const game = JSON.parse(localStorage.getItem("game"));
      // temporary
      if (game.date === "Sun Jul 24 2022") {
        ;
      } else if (game.date === today) {
        this.setState({
          catagories: game.catagories,
          history: game.history,
          guessHistory: game.guessHistory,
          finalGame: game.finalGame,
          modalType: 0,
          win: game.win,
        });
        return;
      }

      this.setState({
        modalType: 0,
      });
    }

    // Generate randomness from todays date
    const seedrandom = require("seedrandom");
    const gen = seedrandom(today);
    const countryRandIndex = Math.floor(gen() * data.length); //country randomizer

    // Select target country, 4 catagories
    const targetCountry = data[countryRandIndex];
    const seededCatagories = this.seedCatagories(
      Object.keys(catagoryNames),
      today,
      seedrandom
    );

    // Generate inital state values
    const initialCatagories = {};
    for (let i in seededCatagories) {
      var key = seededCatagories[i];
      initialCatagories[key] = {
        target: targetCountry[key],
        high: "",
        highName: "",
        low: "",
        lowName: "",
        activeRow: -1,
      };
    }
    //set initial state
    this.setState({
      catagories: initialCatagories,
    });
    this.updateStorageGame(initialCatagories, [], [0, 0, 0, 0], false, {}, today);
  }

  // update state, update display
  updateDisplay(countryData) {
    let check = Object.entries(this.state.catagories)[0]; //used to check if target
    let newCatagories = { ...this.state.catagories }; //we fill this instead of repeatedly calling state
    let newHistory = this.state.history; //history stores what gets inputed
    let newGuessHistory = this.state.guessHistory;
    newHistory.push(countryData.name);

    //is it possible for this to be failed
    //win condition
    if (parseInt(countryData[check[0]]) === parseInt(check[1].target)) {
      let finalGame = this.state.catagories;

      this.setState((state) => {
        return { finalGame: state.catagories }
      });

      this.updateStorageStats(newHistory.length);
      this.togglePopup(4);
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
          activeRow: -2,
        };
        newGuessHistory[i] += 1;
      }

      this.setState({
        catagories: newCatagories,
        history: newHistory,
        guessHistory: newGuessHistory,
        win: true,
      });

      this.updateStorageGame(newCatagories, newHistory, newGuessHistory, true, finalGame, 0);
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
          newCatagories[key].activeRow = 1;
          newGuessHistory[i] += 1;

        } else {
          newCatagories[key].activeRow = 0;
        }
        //2: if new is lower rank
      } else if (rank > target) {
        if (catagory.low === "" || rank < catagory.low) {
          newCatagories[key].low = rank;
          newCatagories[key].lowName = countryData.name;
          newCatagories[key].activeRow = 2;
          newGuessHistory[i] += 1;
        } else {
          newCatagories[key].activeRow = 3;
        }
      }
    }

    this.setState({
      catagories: newCatagories,
      history: newHistory,
      guessHistory: newGuessHistory,
    });

    this.updateStorageGame(newCatagories, newHistory, newGuessHistory, false, 0, 0);
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

  /* newCatagories, newHistory, newWin, finalGame (conditional)*/
  updateStorageGame(newCatagories, newHistory, newGuessHistory, newWin = false, finalGame = 0, date = 0) {

    //if it exists 
    const game = JSON.parse(localStorage.getItem("game")) || {};
    game.catagories = newCatagories;
    game.history = newHistory;
    game.guessHistory = newGuessHistory;
    game.win = newWin;
    if (finalGame) {
      game.finalGame = finalGame;
    }
    if (date) {
      game.date = date;
    }

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


  /* generate 4 randomish catagories values */
  seedCatagories(catagories, seed, seedrandom) {

    // mandatory important catagory seeding
    let mandatoryCatagories = ["alp", "latt", "long"];
    let mandatory = mandatoryCatagories[Math.floor(seedrandom(seed)() * mandatoryCatagories.length)];

    let catagoriesReturn = [];
    catagoriesReturn.push(mandatory);
    let catagoriesCopy = catagories.filter(e => e !== mandatory);

    // other three catagories seeding
    for (let i = 0; i < 3; i++) {
      const rand = Math.floor(seedrandom(seed + i)() * Object.keys(catagoriesCopy).length);
      const newCatagory = catagoriesCopy.splice(rand, 1);
      catagoriesReturn.push(...newCatagory);
    }
    return catagoriesReturn;
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
        return (
          <ModalHow toggleModal={this.toggleModal} />
        );
      case 2:
        modalDisplay = (
          <ModalWin
            toggleModal={this.toggleModal}
            togglePopup={this.togglePopup}
            history={this.state.history}
            catagories={this.state.finalGame}
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
            catagories={this.state.finalGame}
            special={true}
            win={true}
            guessHistory={this.state.guessHistory}
          />
        );
        break;
      default:
        break;
    }

    const popupDisplay = this.state.popupType ? <Popup display={this.state.popupType} togglePopup={this.togglePopup} /> : null;

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
        />
        <Search doSearch={this.doSearch} win={this.state.win} />
      </>
    );
  }
}

export default App;
