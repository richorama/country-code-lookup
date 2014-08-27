# Country Code Lookup

A node.js module to look up countries by various country codes.

Supported codes:

* FIPS 10-4 codes (2 digits)
* ISO 3166 (2 digits)
* ISO 3166 (3 digits)
* ISO 3166 (numbers)
* Internet codes

## Installation

```
$ npm install country-code-lookup
```

## Usage

```js
var lookup = require('country-code-lookup');

// search by FIPS
lookup.byFips('UK');

// search by ISO
lookpup.byIso('GB');
lookpup.byIso('GBR');
lookpup.byIso(826);

// search by internet code
lookpup.byIso('UK');

// get an array of all countries
lookup.countries
```

Searching for a country will return either null, or a country object:

```js
{ continent: 'Europe',
  region: 'Western Europe',
  country: 'United Kingdom',
  capital: 'London',
  fips: 'UK',
  iso2: 'GB',
  iso3: 'GBR',
  isoNo: '826',
  internet: 'UK' }
````

## License

MIT

