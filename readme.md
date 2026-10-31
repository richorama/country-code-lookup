[![NPM version](https://img.shields.io/npm/v/country-code-lookup.svg)](https://www.npmjs.com/package/country-code-lookup)
![](https://github.com/richorama/country-code-lookup/workflows/Node%20CI/badge.svg?branch=master) 
[![Downloads](https://img.shields.io/npm/dm/country-code-lookup.svg)](https://npmcharts.com/compare/country-code-lookup?minimal=true)

# Country Code Lookup

A node.js module to look up countries by various country codes.

Supported codes:

* Legacy FIPS 10-4 / GEC codes (2 letters)
* ISO 3166 (2 letters)
* ISO 3166 (3 letters)
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

## Data scope and review

Reviewed on **31 October 2026**. The dataset contains all 249 current ISO 3166-1
country/territory code triples, checked against [UN M49](https://unstats.un.org/unsd/methodology/m49/)
(plus Taiwan's `TW` / `TWN` / `158`), and one additional entry for Kosovo.
Kosovo's `XK` / `XKX` codes are user-assigned conventions, not official ISO
assignments. Names generally use common English forms rather than uniformly
following formal ISO names.

The retired Netherlands Antilles entry (`AN` / `ANT` / `530`) has been removed;
use Curaçao (`CW`), Sint Maarten (`SX`), or Bonaire, Sint Eustatius and Saba (`BQ`).
See [IANA's account of the successor codes](https://www.iana.org/reports/2011/cw-report-20111003.html).
Exact country-name lookups now use the updated full names for `BQ`, `SJ`, `SH`,
`PS`, `TR`, and `VI`; previous names are not retained as aliases.

FIPS 10-4 was withdrawn in 2008, and its GEC successor was discontinued in 2014.
The `fips` field is retained for legacy lookups, not as a current standard.
See [NGA's historical registers](https://nsgreg.nga.mil/genc/registers.jsp?register=GEC).
The corrected Falkland Islands (`FK`) and Vietnam (`VM`) values are also
documented in [NIST FIPS PUB 10-4](https://nvlpubs.nist.gov/nistpubs/Legacy/FIPS/fipspub10-4.pdf)
(PDF pages 21 and 55, respectively).
An empty `fips` or `internet` field means no code is provided; empty-string
lookups return `null`.

Internet codes represent ASCII ccTLD labels without a dot, not a guarantee
that a domain is delegated or available for registration. The
[IANA root database](https://www.iana.org/domains/root/db) lists delegation status.
For example, `.um`, `.bq`, `.bl`, `.mf`, and `.eh` are not delegated.
`UM` now identifies the United States Minor Outlying Islands rather than sharing
`US`; [IANA explicitly lists `.um` as eligible but not delegated](https://www.iana.org/domains/root/db/um.html).
Kosovo has no assigned `.xk` ccTLD, so its `internet` field is empty.

The `capital` field is a string, with multiple capitals or administrative
centres separated by ` / `. South Africa includes Pretoria, Cape Town, and
Bloemfontein; Eswatini includes Mbabane and Lobamba. Sri Lanka lists
Sri Jayewardenepura Kotte and its commercial capital, Colombo. The `BQ` entry
lists the three islands' administrative centres, not a single shared capital.
Territories without a capital may have an empty string or a descriptive value.
These conventions do not distinguish every constitutional capital from a
temporary seat of government.

Capital spellings for Georgia, Guatemala, Kazakhstan, Kuwait, Mexico, and
Panama are cross-referenced with the
[UN World Statistics Pocketbook 2026](https://unstats.un.org/UNSDWebsite/publications/pocketbook/world-stats-pocketbook-2026.pdf)
(printed pages 113, 122, 142, 145, 167, and 192).
Its footnotes also describe South Africa's three capitals (page 226) and
Sri Lanka's legislative capital (page 229).
Kiribati uses the wider South Tarawa designation, as used by the
[World Bank](https://www.worldbank.org/en/news/press-release/2025/02/12/world-bank-supports-kiribati-in-transforming-kiritimati-island-into-new-center-of-growth);
the UN profile instead names Bairiki.
The three `BQ` administrative centres are cross-referenced with the
[Dutch government's island office locations](https://www.government.nl/themes/government-and-democracy/caribbean-parts-of-the-kingdom/contact-the-national-office-for-the-caribbean-netherlands).
The full `SH` territory name follows
[UK government usage](https://www.gov.uk/foreign-travel-advice/st-helena-ascension-and-tristan-da-cunha).

Recent capital transitions were checked separately: Equatorial Guinea's
[2 January 2026 decree](https://www.guineaecuatorialpress.com/noticias/decreto_ley_por_el_que_se_declara_la_ciudad_de_la_paz_djibloho_capital_de_la_republica_de_guinea_ecuatorial)
designates Ciudad de la Paz, while
[Indonesia's Constitutional Court confirmed in May 2026](https://inp.polri.go.id/artikel/jakarta-remains-national-capital-pending-presidential-decree-constitutional-court)
that Jakarta remains the capital pending a presidential transfer decree.
Planned moves are not treated as completed changes.

Geographic fields retain the package's existing regional vocabulary, including
`Central Africa`, `Pacific`, and ocean-based groupings; they are not a strict
implementation of UN M49 regions. Corrected African classifications and the
single-continent assignment for transcontinental Russia follow UN M49.

## Useful Links

* [ISO 3166 country codes](https://www.iso.org/iso-3166-country-codes.html)
* [South Africa's capitals](https://www.gov.za/nso/about-sa/south-africas-provinces)
* [Sri Lanka country overview](https://www.gov.lk/sri-lanka/country-overview)
* [Eswatini: Lobamba](https://www.thekingdomofeswatini.com/central-eswatini/lobamba/)
* [Turks and Caicos: Cockburn Town](https://www.visittci.com/grand-turk/cockburn-town)

## License

MIT
