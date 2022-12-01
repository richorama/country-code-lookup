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

export type SearchOutput = Country | null;

export const countries: Country[];

export function byFips(code: string): SearchOutput;

export function byIso(code: string | number): SearchOutput;

export function byInternet(code: string): SearchOutput;

export function byCountry(country: string): SearchOutput;
