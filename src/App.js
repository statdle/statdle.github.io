import React from "react";
import ReactGA from "react-ga4";

// import Setup from "./services/Setup";

import Search from "./views/Search";
import Display from "./views/Display";
import Top from "./views/Top";

import ModalHow from "./components/how/ModalHow";
import ModalWin from "./components/modal/ModalWin";
import Popup from "./components/popup/Popup";

import "./styles/_defaults.scss";

import { DATA, VALUETEXT } from "./assets/data";

const NUMCOUNTRIES = 194;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.doSearch = this.doSearch.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateDisplayWin = this.updateDisplayWin.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.setStorageGame = this.setStorageGame.bind(this);
    this.updateStorageGame = this.updateStorageGame.bind(this);
    this.updateStorageStats = this.updateStorageStats.bind(this);

    this.parseValue = this.parseValue.bind(this);
    // this.seedTest = this.seedTest.bind(this);

    this.state = {
      categories: {}, // {<categoryname>: {high: <0>, highName: <"">, low: <0> lowName: <""> target: <0>, activeRow: <0>}, ...}
      history: [], //[{name: "", correct: 0, range: N}, ...]
      // TODO FLIP this back
      modalType: 0, //0: "none", 1: "how" 2: "win from top" 3: "win"
      popupType: 0, //0: "none", 1: "Already Guessed", 2: "Invalid Country", 3: "Copied to Clipboard"
      win: false,
      ended: false,
    };
  }

  componentDidMount() {
    // localStorage.clear();
    // this.seedTest();
    this.setupStats();
    this.setupGame();
  }

  setupStats() {
    if (!localStorage.getItem("stats")) {
      const stats = {
        rounds: 0,
        losingRounds: 0,
        best: 0,
        average: 0,
      };

      localStorage.setItem("stats", JSON.stringify(stats));
    }
  }


  seedTest() {
    const seedrandom = require("seedrandom");
    let count = Array(14).fill(0);
    for(let i = 0; i < 1000; i++){
      let arr = this.seedCategories(
        i,
        seedrandom
      );
      if(arr.length !== 4){
        console.log(arr);
      }
      for(let i in arr){
        count[arr[i]] += 1;
      }
    }
    console.log("a", count);
  }

  /* pick target country and categories */
  setupGame() {

    // check localStorage
    let da = new Date();
    let today = da.toDateString();
    
    if (localStorage.getItem("game")) {

      this.setState({
        modalType: 0,
      });
      // TODO add patch for today
      const game = JSON.parse(localStorage.getItem("game"));
      if (game.date === today && !game.guessHistory && game.date !== "Sat Sep 24 2022") {
        this.setState({
          targetCountry: game.targetCountry,
          categories: game.categories,
          history: game.history,
          win: game.win,
          ended: game.ended,
        });
        return;
      }
    }

    // Generate randomness from todays date
    const seedrandom = require("seedrandom");
    const targetCountry = this.seedTarget(today, seedrandom);
    const seededCategories = this.seedCategories(
      today,
      seedrandom
    );

    // Generate inital state values
    const initialCategories = {};
    for (let i in seededCategories) {
      var index = seededCategories[i];

      initialCategories[index] = {
        target: DATA[targetCountry][index][0],
        high: 0,
        highValues: ["", "", ""],
        low: 0,
        lowValues: ["", "", ""],
        activeRow: -1,
      };
    }

    this.setState({
      categories: initialCategories,
      targetCountry: targetCountry,
    });


    this.setStorageGame(targetCountry.name, initialCategories, today);
  }

  /* generate 1 random value */
  seedTarget(seed, seedrandom) {
    const gen = seedrandom(seed);
    const countryRandIndex = Math.floor(gen() * NUMCOUNTRIES); //country randomizer

    return Object.keys(DATA)[countryRandIndex];
  }


  /* generate 4 randomish categories values */
  // TODO make this more normal
  seedCategories(seed, seedrandom) {
    let initialCategories = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let categoriesReturn = [];

    let mandatory = Math.floor(seedrandom(seed)() * 3);
    categoriesReturn.push(mandatory);
    let categoriesCopy = initialCategories.filter(e => e !== mandatory);

    // other three categories seeding
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(seedrandom(seed + i)() * categoriesCopy.length);
      const newCategory = categoriesCopy.splice(randomIndex, 1);
      categoriesReturn.push(...newCategory);
    }
    return categoriesReturn;
  }

  /* -------------------- */

  /* logic and display changes for valid country submission */
  updateDisplay(newCountry) {

    let newCategories = { ...this.state.categories }; //creates a seperated copy
    let newValues = DATA[newCountry]; // {[], [], []...}
    let newHistory = { code: newCountry, name: newValues[0][1], correct: 0, range: [] };
    let ended = false;

    //win condition
    if (newCountry === this.state.targetCountry) {
      this.updateDisplayWin(newCategories, newHistory, newCountry, newValues);
      return;
    }

    if (this.state.history.length >= 9) {
      // lose condition
      this.updateStorageStats(0);
      this.togglePopup(5);
      this.toggleModal(3);
      ended = true;
    }

    //loop through data categories; name, pop, area, ...
    for (let i in Object.keys(this.state.categories)) {
      const categoryIndex = Object.keys(this.state.categories)[i];
      const category = this.state.categories[categoryIndex];

      const target = category.target;

      const rank = newValues[categoryIndex][0];
      const value = this.parseValue(newValues[categoryIndex][1], i);
      const name = newValues[0][1];


      //1: if new is higher rank
      if (rank < target) {
        if (category.high === 0 || rank > category.high) {
          category.high = rank;
          category.highValues = [newCountry, name, value];
          category.activeRow = 1;
          newHistory.correct += 1;
        } else {
          category.activeRow = 0;
        }

        //2: if new is lower rank
      } else if (rank > target) {
        if (category.low === 0 || rank < category.low) {
          category.low = rank;
          category.lowValues = [newCountry, name, value];
          category.activeRow = 2;
          newHistory.correct += 1;
        } else {
          category.activeRow = 3;
        }
      }

      let range;
      if (category.low === 0) {
        range = 194 - category.high;
      } else if (category.high === 0) {
        range = category.low;
      } else {
        range = category.low - category.high;
      }
      newHistory.range.push(range);
    }

    let finalHistory = this.state.history.concat(newHistory);

    this.setState({
      categories: newCategories,
      history: finalHistory,
      ended: ended,
    });

    this.updateStorageGame(newCategories, finalHistory, false, ended);
  }

  parseValue(value, i){
    const categoryIndex = parseInt(Object.keys(this.state.categories)[i]);
    const valueText = VALUETEXT[categoryIndex];
    if(value === ""){
      return;
    }
    if(valueText[0]){
      return valueText[1] + parseFloat(value).toLocaleString() + valueText[2];
    }
    return valueText[1] + value + valueText[2];
  };


  updateDisplayWin(newCategories, newHistory, newCountry, newValues) {

    this.updateStorageStats(this.state.history.length);
    this.togglePopup(4);
    this.toggleModal(3);


    for (let i in Object.keys(this.state.categories)) {
      const categoryIndex = Object.keys(this.state.categories)[i];
      const category = this.state.categories[categoryIndex];
      const value = this.parseValue(newValues[categoryIndex][1], i);
      const name = newValues[0][1];

      newCategories[categoryIndex] = {
        high: category.target,
        highValues: [newCountry, name, value],
        low: category.target,
        lowValues: [newCountry, name, value],
        activeRow: -2,
      };
      newHistory.range.push(0);
    }
    newHistory.correct = 4;
    let finalHistory = this.state.history.concat(newHistory);


    this.setState({
      categories: newCategories,
      history: finalHistory,
      win: true,
      ended: true,
    });

    this.updateStorageGame(newCategories, finalHistory, true, true);
    return;
  }

  /* initially setting local storage */
  setStorageGame(targetCountry, categories, date) {
    let game = {};
    game.targetCountry = targetCountry;
    game.categories = categories;
    game.date = date;

    game.history = [];
    game.win = false;
    game.ended = false;

    localStorage.setItem("game", JSON.stringify(game));
  }

  /* update values after country entry */
  updateStorageGame(categories, history, win = false, ended = false) {

    let game = JSON.parse(localStorage.getItem("game")) || {};
    game.categories = categories;
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

  doSearch(inp) {
    if (!inp) {
      this.togglePopup(2);
      return;
    }
    for (let i in this.state.history) {
      if (inp === this.state.history[i].code) {
        this.togglePopup(1);
        return;
      }
    }

    this.updateDisplay(inp);
  }

  /* changes modal display
  input: 0: "none", 1: "how" 2: "settings" 3: "win"
  */
  toggleModal(type = 0) {
    this.setState({
      modalType: type,
    });

    ReactGA.gtag("event", "select_content", {
      content_type: type,
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
            categories={this.state.categories}
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
            categories={this.state.categories}
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
          values={this.state.categories}
        />
        <Search doSearch={this.doSearch} ended={this.state.ended} />
      </>
    );
  }
}

export default App;
