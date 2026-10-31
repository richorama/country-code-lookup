var assert = require("assert");
var countries = require("./index.js");

describe("country code", function () {
  it("loads the countries into an array", function () {
    assert(countries.countries.length >= 239, "not all countries loaded, found " + countries.countries.length);
  });

  it("finds countries by fips", function () {
    var uk = countries.byFips("UK");
    assert(uk, "no country");
    assert.strictEqual(uk.country, "United Kingdom");
    assert.strictEqual(uk.continent, "Europe");
    assert.strictEqual(uk.region, "Western Europe");
    assert.strictEqual(uk.capital, "London");
  });

  it("finds countries by iso 2", function () {
    var uk = countries.byIso("GB");
    assert(uk, "no country");
    assert.strictEqual(uk.country, "United Kingdom");
  });

  it("finds countries by iso 3", function () {
    var uk = countries.byIso("GBR");
    assert(uk, "no country");
    assert.strictEqual(uk.country, "United Kingdom");
  });

  it("finds countries by iso number", function () {
    var uk = countries.byIso(826);
    assert(uk, "no country");
    assert.strictEqual(uk.country, "United Kingdom");
  });

  it("finds countries by country name", function () {
    var uk = countries.byCountry("United Kingdom");
    assert(uk, "no country");
    assert.strictEqual(uk.country, "United Kingdom");
    assert.strictEqual(uk.continent, "Europe");
    assert.strictEqual(uk.region, "Western Europe");
    assert.strictEqual(uk.capital, "London");
  });

  it("finds countries by iso number as a string", function () {
    var uk = countries.byIso("826");
    assert(uk, "no country");
    assert.strictEqual(uk.country, "United Kingdom");
  });

  [1826, -826, 826.9, 1000, 1e21, NaN, Infinity, -Infinity].forEach(function (code) {
    it("returns null for invalid numeric ISO code " + code, function () {
      assert.strictEqual(countries.byIso(code), null);
    });
  });

  ["1826", "1000", "999999999999999999999826"].forEach(function (code) {
    it("returns null for out-of-range numeric ISO string " + code, function () {
      assert.strictEqual(countries.byIso(code), null);
    });
  });

  it("preserves numeric ISO padding and leading-zero lookups", function () {
    [4, "4", "04", "004"].forEach(function (code) {
      assert.strictEqual(countries.byIso(code).iso2, "AF");
    });
    [50, "50", "050", "00050"].forEach(function (code) {
      assert.strictEqual(countries.byIso(code).iso2, "BD");
    });
    [0, "000", 999, "999"].forEach(function (code) {
      assert.strictEqual(countries.byIso(code), null);
    });
  });

  it("finds countries by internet code", function () {
    var uk = countries.byInternet("UK");
    assert(uk, "no country");
    assert.strictEqual(uk.country, "United Kingdom");
  });

  it("finds countries by lower case fips", function () {
    var uk = countries.byFips("uk");
    assert(uk, "no country");
    assert.strictEqual(uk.country, "United Kingdom");
  });

  it("throws an error if the iso code is invalid", function () {
    assert.throws(function () {
      countries.byIso("foo bar baz");
    });
  });

  it("returns null if no country is found", function () {
    var uk = countries.byIso(23452);
    assert.strictEqual(uk, null);
  });

  it("Romania is now ROU", function () {
    assert.strictEqual(countries.byIso("ROM"), null);
    assert(countries.byIso("ROU"), "Romania is now ROU");
  });

  it("Democratic Republic of Congo", function () {
    assert(countries.byIso("COD"), "Democratic Republic of Congo is COD");
    assert(countries.byIso("CD"), "Democratic Republic of Congo is CD");
  });

  it("Zambia is ZMB", function () {
    assert(countries.byIso("ZMB"), "Zambia is ZMB");
  });

  it("Finds countries with leading zeros", function () {
    var bangladesh = countries.byIso("050");
    assert(bangladesh, "Bangladesh not found");
    assert.strictEqual(bangladesh.country, "Bangladesh");
  });

  it("All iso numbers are 3 digits", function () {
    var bad = countries.countries
      .filter(country => country.country !== "Republic of Kosovo")
      .filter(country => country.isoNo.length !== 3);
    assert.strictEqual(bad.length, 0, "iso numbers are not all 3 digits - check " + (bad[0] || {}).country);
  });

  it("We now call the Czech Republic 'Czechia'", function () {
    var czechia = countries.byFips("EZ");
    assert.strictEqual(czechia.country, "Czechia");
  });

  it("Sudan is 729", function () {
    var sudan = countries.byIso("SDN");
    assert.strictEqual(sudan.isoNo, "729");
  });

  it("Kosovo is XKX", function () {
    var kosovo = countries.byIso("XKX");
    assert.strictEqual(kosovo.iso3, "XKX");
  });

  [
    ["CV", "country", "Cabo Verde"],
    ["YT", "capital", "Mamoudzou"],
    ["FM", "fips", "FM"],
    ["MM", "capital", "Naypyidaw"],
    ["PW", "capital", "Ngerulmud"],
    ["ZA", "capital", "Pretoria / Cape Town / Bloemfontein"],
    ["TZ", "capital", "Dodoma"],
    ["VE", "internet", "VE"],
    ["WS", "country", "Samoa"],
    ["CD", "internet", "CD"],
    ["TF", "internet", "TF"],
    ["SH", "capital", "Jamestown"],
    ["AX", "fips", ""],
    ["BQ", "fips", ""]
  ].forEach(function (correction) {
    it("uses the corrected " + correction[1] + " for " + correction[0], function () {
      assert.strictEqual(countries.byIso(correction[0])[correction[1]], correction[2]);
    });
  });

  it("finds Micronesia by FIPS without treating ISO-only codes as FIPS", function () {
    assert.strictEqual(countries.byFips("FM"), countries.byIso("FM"));
    assert.strictEqual(countries.byFips("fm"), countries.byIso("FM"));
    ["AX", "ax", "BQ", "bq"].forEach(function (code) {
      assert.strictEqual(countries.byFips(code), null);
    });
  });

  it("finds corrected internet codes and rejects the obsolete values", function () {
    ["VE", "CD", "TF"].forEach(function (code) {
      assert.strictEqual(countries.byInternet(code), countries.byIso(code));
      assert.strictEqual(countries.byInternet(code.toLowerCase()), countries.byIso(code));
    });
    ["UE", "ZR", "--"].forEach(function (code) {
      assert.strictEqual(countries.byInternet(code), null);
    });
  });

  it("finds the updated country names and rejects the old names", function () {
    assert.strictEqual(countries.byCountry("Cabo Verde"), countries.byIso("CV"));
    assert.strictEqual(countries.byCountry("Samoa"), countries.byIso("WS"));
    assert.strictEqual(countries.byCountry("Cape Verde"), null);
    assert.strictEqual(countries.byCountry("Western Samoa"), null);
  });

  it("rejects the retired Netherlands Antilles codes and retains its successors", function () {
    ["AN", "ANT", 530].forEach(function (code) {
      assert.strictEqual(countries.byIso(code), null);
    });
    assert.strictEqual(countries.byFips("NT"), null);
    assert.strictEqual(countries.byInternet("AN"), null);
    assert.strictEqual(countries.byCountry("Netherlands Antilles"), null);
    ["CW", "SX", "BQ"].forEach(function (code) {
      assert(countries.byIso(code));
    });
  });

  it("uses legacy FIPS codes rather than incorrect or ISO-only codes", function () {
    [["FK", "FK", "FA"], ["VN", "VM", "VN"]].forEach(function (codes) {
      assert.strictEqual(countries.byFips(codes[1]), countries.byIso(codes[0]));
      assert.strictEqual(countries.byFips(codes[1].toLowerCase()), countries.byIso(codes[0]));
      assert.strictEqual(countries.byFips(codes[2]), null);
    });
  });

  it("distinguishes eligible internet codes from unofficial and empty codes", function () {
    assert.strictEqual(countries.byInternet("US"), countries.byIso("US"));
    assert.strictEqual(countries.byInternet("um"), countries.byIso("UM"));
    assert.strictEqual(countries.byInternet("XK"), null);
    assert.strictEqual(countries.byIso("XK").internet, "");
    assert.strictEqual(countries.byInternet(""), null);
    assert.strictEqual(countries.byFips(""), null);
  });

  [
    ["BQ", "Bonaire, Sint Eustatius and Saba"],
    ["SJ", "Svalbard and Jan Mayen"],
    ["SH", "Saint Helena, Ascension and Tristan da Cunha"],
    ["PS", "State of Palestine"],
    ["TR", "Türkiye"],
    ["VI", "United States Virgin Islands"]
  ].forEach(function (entry) {
    it("finds the current full country or territory name for " + entry[0], function () {
      assert.strictEqual(countries.byCountry(entry[1]), countries.byIso(entry[0]));
    });
  });

  [
    ["GE", "Tbilisi"],
    ["GT", "Guatemala City"],
    ["KZ", "Astana"],
    ["KI", "South Tarawa"],
    ["KW", "Kuwait City"],
    ["MX", "Mexico City"],
    ["PA", "Panama City"],
    ["LK", "Sri Jayewardenepura Kotte / Colombo"],
    ["SZ", "Mbabane / Lobamba"],
    ["TC", "Cockburn Town"],
    ["UM", ""],
    ["BQ", "Kralendijk / Oranjestad / The Bottom"]
  ].forEach(function (entry) {
    it("uses the corrected capital or administrative centres for " + entry[0], function () {
      assert.strictEqual(countries.byIso(entry[0]).capital, entry[1]);
    });
  });

  [
    ["AO", "Africa", "Central Africa"],
    ["BI", "Africa", "Eastern Africa"],
    ["CM", "Africa", "Central Africa"],
    ["GQ", "Africa", "Central Africa"],
    ["GA", "Africa", "Central Africa"],
    ["MW", "Africa", "Eastern Africa"],
    ["MZ", "Africa", "Eastern Africa"],
    ["RW", "Africa", "Eastern Africa"],
    ["ST", "Africa", "Central Africa"],
    ["SS", "Africa", "Eastern Africa"],
    ["ZM", "Africa", "Eastern Africa"],
    ["ZW", "Africa", "Eastern Africa"],
    ["MN", "Asia", "East Asia"],
    ["RU", "Europe", "Eastern Europe"],
    ["CX", "Oceania", "Indian Ocean"],
    ["CC", "Oceania", "Indian Ocean"],
    ["UM", "Oceania", "Pacific"]
  ].forEach(function (entry) {
    it("uses the corrected geographic classification for " + entry[0], function () {
      var country = countries.byIso(entry[0]);
      assert.strictEqual(country.continent, entry[1]);
      assert.strictEqual(country.region, entry[2]);
    });
  });

  // null/undefined input guards
  it("byFips returns null for null/undefined/non-string input", function () {
    assert.strictEqual(countries.byFips(null), null);
    assert.strictEqual(countries.byFips(undefined), null);
    assert.strictEqual(countries.byFips(123), null);
  });

  it("byIso returns null for null/undefined", function () {
    assert.strictEqual(countries.byIso(null), null);
    assert.strictEqual(countries.byIso(undefined), null);
  });

  it("byIso returns null for non-string/non-number input without coercion", function () {
    [true, [826], { toString: function () { return "826"; } }, 826n, Symbol("826")].forEach(function (code) {
      assert.strictEqual(countries.byIso(code), null);
    });
  });

  it("byInternet returns null for null/undefined/non-string input", function () {
    assert.strictEqual(countries.byInternet(null), null);
    assert.strictEqual(countries.byInternet(undefined), null);
    assert.strictEqual(countries.byInternet(42), null);
  });

  it("byCountry returns null for null/undefined/non-string input", function () {
    assert.strictEqual(countries.byCountry(null), null);
    assert.strictEqual(countries.byCountry(undefined), null);
    assert.strictEqual(countries.byCountry(99), null);
  });

  // byIso does not treat mixed alpha-numeric strings as numbers
  it("byIso does not misparse mixed alpha-numeric strings as numbers", function () {
    // "1A" has length 2, so it's treated as an iso2 lookup (not a number), returning null
    assert.strictEqual(countries.byIso("1A"), null);
  });

  // countries array is frozen
  it("countries array is frozen and immutable", function () {
    assert(Object.isFrozen(countries.countries), "countries array should be frozen");
    assert(Object.isFrozen(countries.countries[0]), "country objects should be frozen");
  });
});
