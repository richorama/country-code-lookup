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

### Invalid inputs and lookup failures

All lookup methods return `null` when a supported code or exact country name
has no matching entry. Country-name matching is case-sensitive and does not
trim whitespace.

`byFips`, `byInternet`, and `byCountry` also return `null` for non-string inputs.
`byIso` returns `null` for inputs that are neither strings nor numbers.

Numeric ISO inputs must be integers between `0` and `999`. Invalid numbers
(including negative, fractional, non-finite, and out-of-range values) return
`null`. Digit-only strings are treated as numeric ISO codes, and leading zeros
are supported.

Unlike the other lookup methods, `byIso` throws
`Error('cannot determine ISO code type')` for non-numeric strings whose length
is neither two nor three characters. This existing behavior is retained for
compatibility.

```js
lookup.byIso('ZZ')       // null: no matching ISO alpha-2 code
lookup.byIso(1826)       // null: numeric code is out of range
lookup.byIso('050')      // Bangladesh
lookup.byCountry(' united kingdom ') // null: not an exact country name
lookup.byIso('invalid')  // throws Error('cannot determine ISO code type')
```

Country objects expose numeric ISO codes as three-digit strings, such as
`'004'` for Afghanistan. Kosovo has no assigned ISO numeric code, so its
`isoNo` is `null`.

## Useful Links

ISO 2 and 3 digit country codes: https://www.iban.com/country-codes

## License

MIT
