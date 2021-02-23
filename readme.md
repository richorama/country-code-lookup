[![NPM version](https://img.shields.io/npm/v/country-code-lookup.svg)](https://www.npmjs.com/package/country-code-lookup)
![](https://github.com/richorama/country-code-lookup/workflows/Node%20CI/badge.svg?branch=master) 
[![Downloads](https://img.shields.io/npm/dm/country-code-lookup.svg)](https://npmcharts.com/compare/country-code-lookup?minimal=true)

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
const lookup = require('country-code-lookup')

// search by FIPS
lookup.byFips('UK')

// search by ISO
lookup.byIso('GB')
lookup.byIso('GBR')
lookup.byIso(826)

// search by internet code
lookup.byInternet('UK')

// search by country name
lookup.byCountry('United Kingdom')

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

## Useful Links

ISO 2 and 3 digit country codes: https://www.iban.com/country-codes

## License

MIT
