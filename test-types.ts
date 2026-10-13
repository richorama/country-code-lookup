import { Country, countries, byIso } from "./index";

const missingIsoNo: Country["isoNo"] = null;
const numericIsoNo: Country["isoNo"] = "826";
const country = byIso("GB");

if (country) {
  if (country.isoNo !== null) {
    const code: string = country.isoNo;
  }

  // @ts-expect-error Lookup results are frozen.
  country.capital = "Changed";
}

// @ts-expect-error The exported array is frozen.
countries.push(countries[0]);

// @ts-expect-error Entries in the exported array cannot be replaced.
countries[0] = countries[1];

// @ts-expect-error Country records in the exported array are frozen.
countries[0].isoNo = "000";
