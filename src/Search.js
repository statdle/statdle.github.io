import React, { Component } from "react";

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
      e.preventDefault();
      this.props.doSearch(this.state.inputValue);

      this.setState({
        inputValue: "",
        autocompleteCountries: [],
        autocompleteIndex: -1,
      });
    } else if (e.keyCode === 38) {
      e.preventDefault();

      if (autocompleteIndex === -1 || autocompleteIndex === 0) {
        autocompleteIndex = autocompleteLength;
      }

      this.setState({
        autocompleteIndex: autocompleteIndex - 1,
        inputValue: autocompleteCountries[autocompleteIndex - 1],
      });
    } else if (e.keyCode === 40) {
      e.preventDefault();

      if (autocompleteIndex === autocompleteLength - 1) {
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
    //if smaller remove everything
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
    // this.state.autocompleteCountries[this.state.autocompleteIndex]

    const suggestions = this.state.autocompleteCountries.map((item) => {
      return (
        <div
          key={item}
          onClick={this.autocompleteClick}
          className="autocomplete-suggestion"
        >
          {item}
        </div>
      );
    });

    return (
      <div id="search-module">
        <div id="autocomplete-container">{suggestions}</div>
        <form onSubmit={this.handleSearch}>
          <input
            type="search"
            placeholder="Country..."
            id="country-search"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.inputValue}
            onKeyDown={this.handleKeyDown}
          ></input>
          <input type="submit" id="country-submit" value="Go" />
        </form>
      </div>
    );
  }
}

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Republic of the Congo",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default Search;
