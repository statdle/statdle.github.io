import React from "react";
import './search.scss';
import { COUNTRYNAMES } from "../assets/data.js";

//props history, ended
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      autocompleteCountries: [],
      autocompleteIndex: -1,
      validCountry: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.autocompleteClick = this.autocompleteClick.bind(this);
    this.scrollToSelected = this.scrollToSelected.bind(this);
    this.runSearch = this.runSearch.bind(this);

    this.searchInput = React.createRef();
    this.selectedSuggestion = React.createRef();
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  scrollToSelected() {
    if (this.autocompleteIndex !== -1) {
      this.selectedSuggestion.current.scrollIntoView();
    }
  }

  autocompleteClick(e) {
    this.setState({
      inputValue: e.target.textContent,
      autocompleteCountries: [],
    });
  }

  handleKeyDown(e) {
    var autocompleteIndex = this.state.autocompleteIndex;
    const autocompleteCountries = this.state.autocompleteCountries;
    const autocompleteLength = autocompleteCountries.length;

    //Enter
    if (e.keyCode === 13) {
      e.preventDefault();
      this.runSearch();
      return;
    }

    // required for UP, DOWN, etc ... 
    if (this.state.autocompleteCountries.length === 0) {
      return;
    }

    // UP
    if (e.keyCode === 38) {
      e.preventDefault();

      if (autocompleteIndex === -1 || autocompleteIndex === 0) {
        autocompleteIndex = autocompleteLength;
      }

      this.setState({
        autocompleteIndex: autocompleteIndex - 1,
        inputValue: autocompleteCountries[autocompleteIndex - 1],
      }, () => { this.scrollToSelected(); });
      return;
    }

    //DOWN
    if (e.keyCode === 40) {
      e.preventDefault();

      if (autocompleteIndex === autocompleteLength - 1) {
        autocompleteIndex = -1;
      }
      this.setState({
        autocompleteIndex: autocompleteIndex + 1,
        inputValue: autocompleteCountries[autocompleteIndex + 1],
      }, () => { this.scrollToSelected(); });
      return;
    }

    // HOME
    if (e.keyCode === 36) {
      e.preventDefault();

      this.setState({
        autocompleteIndex: 0,
        inputValue: autocompleteCountries[0],
      }, () => { this.scrollToSelected(); });
      return;
    }

    // END
    if (e.keyCode === 35) {
      e.preventDefault();

      this.setState({
        autocompleteIndex: autocompleteLength - 1,
        inputValue: autocompleteCountries[autocompleteLength - 1],
      }, () => { this.scrollToSelected(); });

      this.scrollToSelected();
      return;
    }

  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      inputValue: e.target.value,
      autocompleteIndex: -1,
    });

    this.handleAutocomplete(e.target.value);
  }

  handleAutocomplete(str) {
    //if nothing in input
    if (str.length < 1) {
      this.setState({
        autocompleteCountries: [],
      });
      return;
    }

    //filter countries

    // TODO
    const reducedCountries = Object.keys(COUNTRYNAMES).filter(
      (country) => country.toLowerCase().search(str.toLowerCase()) === 0
    );



    //update state
    this.setState({
      autocompleteCountries: reducedCountries,
    });
  }

  handleSearch(e) {
    e.preventDefault();
    this.runSearch();
  }

  runSearch(){
    this.props.doSearch(COUNTRYNAMES[this.state.inputValue] ?? 0);

    this.setState({
      inputValue: "",
      autocompleteIndex: -1,
      autocompleteCountries: [],
   });
  }


  render() {
    const suggestions = this.state.autocompleteCountries.map((item) => {
      if (this.state.inputValue === item) {
        return (
          <div
            role="option"
            aria-selected="true"
            key={item}
            onClick={this.autocompleteClick}
            className="suggestion suggestion__selected"
            ref={this.selectedSuggestion}
          >
            {item}
          </div>
        );
      } else {
        return (
          <div
            role="option"
            aria-selected="false"
            key={item}
            onClick={this.autocompleteClick}
            className="suggestion"
          >
            {item}
          </div>
        );
      }

    });

    return (
      <div className="search__container">
        <div role="listbox" aria-label="filtered countries" className="suggestion__container">{suggestions}</div>
        <form className="form" onSubmit={this.handleSearch}>
          <input
            aria-label="Guess Country"
            type="text"
            placeholder="Country..."
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.inputValue}
            onKeyDown={this.handleKeyDown}
            disabled={this.props.ended}
            className={"country-search " + (this.props.ended ? "country-search--disabled" : "")}
            ref={inp => (this.searchInput = inp)}
          ></input>

          <input type="submit" aria-label="guess" className={"country-submit btn " + (this.state.inputValue ? "btn--active" : "btn--inactive")} value="Guess" />
        </form>
      </div>
    );
  }
}

export default Search;
