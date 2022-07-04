import React from "react";
import countries from "../assets/countries.js";
import './search.scss';

//props history, win
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      autocompleteCountries: [],
      autocompleteIndex: -1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.autocompleteClick = this.autocompleteClick.bind(this);
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

    if (e.keyCode === 13) {
      //Enter
      e.preventDefault();
      this.props.doSearch(this.state.inputValue);

      this.setState({
        inputValue: "",
        autocompleteCountries: [],
        autocompleteIndex: -1,
      });
    } else if (e.keyCode === 38) {
      //UP
      e.preventDefault();

      if (this.state.autocompleteCountries.length === 0) {
        return;
      } else if (autocompleteIndex === -1 || autocompleteIndex === 0) {
        autocompleteIndex = autocompleteLength;
      }

      this.setState({
        autocompleteIndex: autocompleteIndex - 1,
        inputValue: autocompleteCountries[autocompleteIndex - 1],
      });
    } else if (e.keyCode === 40) {
      //DOWN
      e.preventDefault();

      if (this.state.autocompleteCountries.length === 0) {
        return;
      } else if (autocompleteIndex === autocompleteLength - 1) {
        autocompleteIndex = -1;
      }

      this.setState({
        autocompleteIndex: autocompleteIndex + 1,
        inputValue: autocompleteCountries[autocompleteIndex + 1],
      });
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
    const reducedCountries = countries.filter(
      (country) => country.toLowerCase().search(str.toLowerCase()) === 0
    );

    //update state
    this.setState({
      autocompleteCountries: reducedCountries,
    });
  }

  handleSearch(e) {
    e.preventDefault();

    this.props.doSearch(this.state.inputValue);

    this.setState({
      inputValue: "",
      autocompleteIndex: -1,
    });
  }

  render() {
    const suggestions = this.state.autocompleteCountries.map((item) => {
      return (
        <div
          key={item}
          onClick={this.autocompleteClick}
          className={
            "suggestion " +
            (this.state.inputValue === item ? "suggestion__selected" : "")
          }
        >
          {item}
        </div>
      );
    });

    return (
      <div className="search__container">
        <div className="suggestion__container">{suggestions}</div>
        <form className="form" onSubmit={this.handleSearch}>
          <input
            type="text"
            placeholder="Country..."
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.inputValue}
            onKeyDown={this.handleKeyDown}
            disabled={this.props.win}
            className={"country-search " + (this.props.win ? "country-search--disabled" : "")}
          ></input>

          <input type="submit" className="country-submit" value="Go" />
        </form>
      </div>
    );
  }
}

export default Search;
