export interface Country {
  continent: string;
  region: string;
  country: string;
  capital: string;
  fips: string;
  iso2: string;
  iso3: string;
  isoNo: string;
  internet: string;
}

export const countries: Country[];

export type CountrySearchResult = Country | null;

export function byFips(code: string): CountrySearchResult;

export function byIso(code: string | number): CountrySearchResult;

export function byInternet(code: string): CountrySearchResult;

export function byCountry(country: string): CountrySearchResult;
