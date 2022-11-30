import { useEffect, useState } from "react";
export type Country = {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  currencies: {
    [key: string]: { name: string; symbol: string };
  };
  region: string;
  subregion: string;
  population: number;
  languages: {
    [key: string]: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  borders: string[];
  cca3: string;
  tld: string[];
};

// [
//   {
//     "flags": {
//       "png": "https://flagcdn.com/w320/au.png",
//       "svg": "https://flagcdn.com/au.svg"
//     },
//     "name": {
//       "common": "Australia",
//       "official": "Commonwealth of Australia",
//       "nativeName": {
//         "eng": {
//           "official": "Commonwealth of Australia",
//           "common": "Australia"
//         }
//       }
//     },
//     "cioc": "AUS",
//     "currencies": { "AUD": { "name": "Australian dollar", "symbol": "$" } },
//     "capital": ["Canberra"],
//     "altSpellings": ["AU"],
//     "region": "Oceania",
//     "subregion": "Australia and New Zealand",
//     "population": 25687041
//   }
// ]
export const useCountries = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchedName, setSearchedName] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const path = searchedName
        ? `/name/${searchedName}`
        : region
        ? `/region/${region}`
        : "/all";

      const data = await fetch(
        `https://restcountries.com/v3.1${path}?fields=name,capital,currencies,population,region,subregion,flags,cioc,cca2,ccn3,cca3,borders,`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      ).then((res) => res.json() as Promise<Country[]>);

      setCountries(data);
      setLoading(false);
    };

    const timer = setTimeout(() => {
      getData();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchedName, region]);

  return { countries, loading, setSearchedName, setRegion };
};
