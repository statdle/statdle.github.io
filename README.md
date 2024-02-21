Find the Nation State using Statistics! 


A React project following the legacy of webapps wordleifying sporcle quizzes. 

Built using ReactJS and SCSS.

---

### Data Sources

| Catagory | Data Source |
| :--- | :--- |
| Name Alphabetically | UN Names ^a |
| Capital Alphabetically | [Tech Slides](http://techslides.com/list-of-countries-and-capitals) ^b|
| Capital Latitude [N → S] | [Tech Slides](http://techslides.com/list-of-countries-and-capitals) ^b |
| Capital Longitude [W → E] | [Tech Slides](http://techslides.com/list-of-countries-and-capitals) ^b |
| GDP | [UNdata](https://data.un.org/) |
| GDP per Capita | [UNdata](https://data.un.org/) |
| Surface Area | [UNSD](https://gist.github.com/9ps/eee96f40fe8946e674fb365f30f02d27) ^c|
| Population | [UNdata](https://data.un.org/) |
| GDP Growth | [UNdata](https://data.un.org/) ^d |
| Population Growth | [UNdata](https://data.un.org/) ^d |
| Population Density | [UNdata](https://data.un.org/) |
| Median Age | [UNdata](https://data.un.org/) |
| Average Elevation | [Atlas Big](https://www.atlasbig.com/en-us/countries-average-elevation) ^e|
| Median Temperature | [Wikipedia](https://en.wikipedia.org/wiki/List_of_countries_by_average_yearly_temperature) and [World Bank](https://climateknowledgeportal.worldbank.org/)|
| Tree Density | [Nature](https://www.nature.com/articles/nature14967) ^f|

^a: With edits that increase understanding, such as fully changed "North Korea", "South Korea", consistency informed "Turkey", "Vietnam", and shortenings "Russia", "Laos", etc.

^b: Some countries have multiple capitals, some countries have contested capitals. For countries with multiple capitals, I used the executive capital, if not explicit, by "de-facto". In the case of Israel, its claim to Jerusalem is not widely recognised, and illegimate, and bad for the game if two capitals are the same, so I made it Tel Aviv. I used google maps latt long coordinates for changed locations.

^c: Annoyingly, the UN doesn't give enough detail for surface area in its .CSV forms, so I parsed a 2012 UN source, which is incomplete and a bit weird in its own right, and subbed in data from Wikipedia for Sudan which was abscent.

^d: I got UN data from 2009 and 2019 and calculated the change independently.

^e: This data is quite suspect, but I don't know how to use GIS well enough to produce it myself

^f: Using Supplementary Table 2, biome calculation

### Seeding

The current category seeding algorithm picks 1 each from the following groups:
* Name Alphabetically, Capital Alphabetically
* Capital Latitude [N → S], Capital Longitude [W → E]
* GDP, GDP per Capita, Surface Area, Population, GDP Growth
* Population Growth, Population Density, Median Age, Average Elevation, Median Temperature, Tree Density

### Manipulations

As with all data pertaining the countries, there are specific inclusions, exclusions, innacuracies and manipulations that are made. Missing data from some sources are repaired or substituded to the best of my ability. If two countries have the same value for a catagory, **the one first alphabetically has the better rank** (I have tried to avoid scenarios like this).

#### What Counts as a Country

Not included: Vatican City, Greenland, Kosovo, Somaliland, Taiwan/Chinese Taipei, Bougainville

Included: Palestine

#### What Counts as a Capital

| Country      | Capital |
| :--- | :--- |
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

---

[data sheet (have fun parsing it)](https://gist.github.com/9ps/062afd21e0698cfd5c39e10b83db89db)

[form for feedback](https://docs.google.com/forms/d/e/1FAIpQLSf9NfB5E7mMjUAhYh-GrwS8uS1s3jZRQQ9dAP8_DB4OKmU16w/viewform)
