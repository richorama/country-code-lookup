export interface Country {
  readonly continent: string;
  readonly region: string;
  readonly country: string;
  readonly capital: string;
  readonly fips: string;
  readonly iso2: string;
  readonly iso3: string;
  readonly isoNo: string | null;
  readonly internet: string;
}

export type SearchOutput = Country | null;

export const countries: ReadonlyArray<Country>;

export function byFips(code: string): SearchOutput;

export function byIso(code: string | number): SearchOutput;

export function byInternet(code: string): SearchOutput;

export function byCountry(country: string): SearchOutput;
