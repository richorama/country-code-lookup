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
