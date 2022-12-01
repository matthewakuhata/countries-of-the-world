import { useEffect, useState } from "react";
import { Country } from "./useCountriesHook";

export const useCountryDetails = (cioc: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [countryData, setCountryData] = useState<Country>();
  const [borderCountryNames, setBorderCountryNames] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const [data] = await fetch(
          `https://restcountries.com/v3.1/alpha/${cioc}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        ).then((res) => res.json() as Promise<Country[]>);

        if (data.borders?.length) {
          const borderCountries = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${data.borders.join(
              ","
            )}&fields=name,cca3`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          ).then((res) => res.json() as Promise<Country[]>);

          const borderMap = borderCountries.reduce(
            (obj, country) => ({ ...obj, [country.cca3]: country.name.common }),
            {}
          );
          setBorderCountryNames(borderMap);
        }

        setCountryData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [cioc]);

  return { countryData, borderCountryNames, loading };
};
