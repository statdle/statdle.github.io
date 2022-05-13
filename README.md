A React project following the legacy of webapps wordleifying sporcle quizzes. Find the Secret Nation-State using Statistics!

## Statdle Technicalities/FAQ

**"Daily" Operation:**
* The unknown country and catagories are seeded locally based on the date (rather than dispatched from a server). Currently, there is no mechanism to stop repeats, as it is entirely random.

**Ranking**
* If two countries have the same value, then the one alphabetically first will have the better rank

**Data Sources:**
* I used mostly whats on Wikipedia and Worldometers, more bespoke sources include: 
* Capital Coordinates: http://techslides.com/list-of-countries-and-capitals (edited for errors)
* Average Elevation: https://www.atlasbig.com/en-us/countries-average-elevation (the Wikipedia, CIA sources were incorrect and incomplete, this one probably is as well, but has more precision and half of a source)

**Capital Names:**

| Country      | Capital |
| ----------- | ----------- |
| Bolivia | La Paz |
| Burundi | Gitega |
| Egypt | Cairo |
| Israel | Tel Aviv |
| Kazakhstan | Astana |
| Kiribati | South Tarawa |
| Myanmar | Naypyidaw |
| Sri Lanka | Colombo |
| Palestine | Ramallah |
| South Africa | Pretoria |
| Ukraine | Kyiv |

* The actual city populations of Djibouti and Luxembourg were used
* City Population data was sourced from Wikipedia (but I used the excel tool)
