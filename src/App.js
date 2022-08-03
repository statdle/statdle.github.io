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
    this.seedCatagories = this.seedCatagories.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.setStorageGame = this.setStorageGame.bind(this);
    this.updateStorageGame = this.updateStorageGame.bind(this);
    this.updateStorageStats = this.updateStorageStats.bind(this);

    this.state = {
      catagories: {}, // {<catagoryname>: {high: <0>, highName: <"">, low: <0> lowName: <""> target: <0>, activeRow: <0>}, ...}
      history: [], //[{name: "", correct: 0, range: N}, ...]
      modalType: 1, //0: "none", 1: "how" 2: "win from top" 3: "win"
      popupType: 0, //0: "none", 1: "Already Guessed", 2: "Invalid Country", 3: "Copied to Clipboard"
      win: false,
      ended: false,
    };
  }

  componentDidMount() {
    // localStorage.clear();
    this.setupStats();
    this.setupGame();
  }

  setupStats() {
    if (!localStorage.getItem("stats")) {
      //set up stats
      const stats = {
        rounds: 0,
        losingRounds: 0,
        best: 0,
        average: 0,
      };

      localStorage.setItem("stats", JSON.stringify(stats));
    }
  }

  /* pick target country and catagories */
  setupGame() {

    // check localStorage
    let today = new Date().toDateString();
    if (localStorage.getItem("game")) {

      this.setState({
        modalType: 0,
      });

      const game = JSON.parse(localStorage.getItem("game"));
      if (game.date === today) {
        this.setState({
          targetCountry: game.targetCountry,
          catagories: game.catagories,
          history: game.history,
          win: game.win,
          ended: game.ended,
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
        high: 0,
        highName: "",
        low: 0,
        lowName: "",
        activeRow: -1,
      };
    }
    this.setState({
      catagories: initialCatagories,
      targetCountry: targetCountry.name,
    });


    this.setStorageGame(targetCountry.name, initialCatagories, today);
  }

  /* generate 4 randomish catagories values */
  seedCatagories(catagories, seed, seedrandom) {

    let catagoriesReturn = [];

    let mandatoryCatagories = ["alp", "latt", "long"];
    let mandatory = mandatoryCatagories[Math.floor(seedrandom(seed)() * mandatoryCatagories.length)];
    catagoriesReturn.push(mandatory);
    let catagoriesCopy = catagories.filter(e => e !== mandatory);

    // other three catagories seeding
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(seedrandom(seed + i)() * Object.keys(catagoriesCopy).length);
      const newCatagory = catagoriesCopy.splice(randomIndex, 1);
      catagoriesReturn.push(...newCatagory);
    }
    return catagoriesReturn;
  }

  /* -------------------- */

  /* logic and display changes for valid country submission */
  updateDisplay(countryData) {
    let name = countryData.name;
    let newCatagories = { ...this.state.catagories }; //creates a seperated copy
    let newHistory = { name: name, correct: 0, range: [] };
    let ended = false;

    //win condition
    if (name === this.state.targetCountry) {
      this.updateStorageStats(this.state.history.length);
      this.togglePopup(4);
      this.toggleModal(3);

      for (let i in Object.keys(this.state.catagories)) {
        var keyWin = Object.keys(this.state.catagories)[i];
        const catagory = this.state.catagories[keyWin];
        newCatagories[keyWin] = {
          target: catagory.target,
          high: catagory.target,
          highName: name,
          low: catagory.target,
          lowName: name,
          activeRow: -2,
        };
        newHistory.range.push(0);
      }
      newHistory.correct = 4;
      let finalHistory = this.state.history.concat(newHistory);

      this.setState({
        catagories: newCatagories,
        history: finalHistory,
        win: true,
        ended: true,
      });

      this.updateStorageGame(newCatagories, finalHistory, true, true);
      return;

    } else if (this.state.history.length >= 9) {
      // lose condition

      this.updateStorageStats(0);
      this.togglePopup(5);
      this.toggleModal(3);
      ended = true;
    }

    //loop through data catagories; name, pop, area, ...
    for (let i in Object.keys(this.state.catagories)) {
      var key = Object.keys(this.state.catagories)[i];

      const catagory = newCatagories[key];
      const rank = parseInt(countryData[key]);
      const target = parseInt(catagory.target);


      //1: if new is higher rank
      if (rank < target) {
        if (catagory.high === 0 || rank > catagory.high) {
          catagory.high = rank;
          catagory.highName = name;
          catagory.activeRow = 1;
          newHistory.correct += 1;
        } else {
          catagory.activeRow = 0;
        }

        //2: if new is lower rank
      } else if (rank > target) {
        if (catagory.low === 0 || rank < catagory.low) {
          catagory.low = rank;
          catagory.lowName = name;
          catagory.activeRow = 2;
          newHistory.correct += 1;
        } else {
          catagory.activeRow = 3;
        }
      }

      let range;
      if (catagory.low === 0) {
        range = 194 - catagory.high;
      } else if (catagory.high === 0) {
        range = catagory.low;
      } else {
        range = catagory.low - catagory.high;
      }
      newHistory.range.push(range);
    }

    let finalHistory = this.state.history.concat(newHistory);

    this.setState({
      catagories: newCatagories,
      history: finalHistory,
      ended: ended,
    });

    this.updateStorageGame(newCatagories, finalHistory, false, ended);
  }

  /* -------------------- */

  /* initially setting local storage */
  setStorageGame(targetCountry, catagories, date) {
    console.log("hi set");
    let game = {};
    game.targetCountry = targetCountry;
    game.catagories = catagories;
    game.date = date;

    game.history = [];
    game.win = false;
    game.ended = false;

    localStorage.setItem("game", JSON.stringify(game));
  }

  /* update values after country entry */
  updateStorageGame(catagories, history, win = false, ended = false) {
    console.log("hi update");

    let game = JSON.parse(localStorage.getItem("game")) || {};
    game.catagories = catagories;
    game.history = history;
    game.win = win;
    game.ended = ended;

    localStorage.setItem("game", JSON.stringify(game));
  }

  updateStorageStats(guesses) {
    let stats = JSON.parse(localStorage.getItem("stats"));
    let best = stats.best || 0;
    let average = stats.average || 0;
    let rounds = stats.rounds || 0;
    let losingRounds = stats.losingRounds || 0;

    // if didnt get a score
    if (guesses === 0) {
      losingRounds += 1;

    } else {

      if (guesses < best || best === 0) {
        best = guesses;
      }

      average = Math.round(((average * rounds + guesses) / (rounds + 1)) * 10) / 10;
      rounds = rounds + 1;
    }

    stats = {
      rounds: rounds,
      best: best,
      average: average,
      losingRounds: losingRounds,
    };

    localStorage.setItem("stats", JSON.stringify(stats));
  }

  /* -------------------- */

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
      if (searchTerm === this.state.history[i].name.toLowerCase()) {
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

  /* -------------------- */

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

            targetCountry={this.state.targetCountry}
            catagories={this.state.catagories}
            history={this.state.history}

            special={false}
            win={this.state.win}
            ended={this.state.ended}

          />
        );
        break;
      case 3:
        modalDisplay = (
          <ModalWin
            toggleModal={this.toggleModal}
            togglePopup={this.togglePopup}

            targetCountry={this.state.targetCountry}
            catagories={this.state.catagories}
            history={this.state.history}

            special={true}
            win={this.state.win}
            ended={this.state.ended}
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
        <Search doSearch={this.doSearch} ended={this.state.ended} />
      </>
    );
  }
}

export default App;
