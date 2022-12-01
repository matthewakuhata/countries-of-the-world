import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoadingBar from "../components/LoadingBar/LoadingBar";
import { Country } from "../hooks/useCountriesHook";
import { formatNumber } from "../utils/formatNumber";

import "./CountryDetail.css";
const CountryDetail = () => {
  const { cioc } = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState<Country>();
  const [borderCountryNames, setBorderCountryNames] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState(false);

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

  if (loading) return <LoadingBar />;

  return countryData ? (
    <div className="country-detail">
      <button className="country-detail__button" onClick={() => navigate("/")}>
        <span className="icon">
          <i className="fas fa-arrow-left" /> Back
        </span>
      </button>
      <div className="country-detail__content">
        <img
          src={countryData.flags.svg}
          alt={`${countryData.name.common} Flag`}
        />
        <div>
          <h2>{countryData.name.common}</h2>
          <div className="country-detail__facts">
            <p>
              <b>Native Name:</b> {countryData.name.official}
            </p>
            <p>
              <b>Population:</b> {formatNumber(countryData.population)}
            </p>
            <p>
              <b>Region:</b> {countryData.region}
            </p>
            <p>
              <b>Sub Region:</b> {countryData.subregion}
            </p>
            <p>
              <b>Capital:</b> {countryData.capital.join(", ")}
            </p>
            <p>
              <b>Top Level Domain:</b> {countryData.tld.join(", ")}
            </p>
            <p>
              <b>Currencies:</b>{" "}
              {Object.values(countryData.currencies)
                .map((c) => c.name)
                .join(", ")}
            </p>
            <p>
              <b>Languages:</b>{" "}
              {Object.values(countryData.languages).join(", ")}
            </p>
          </div>
          {countryData.borders?.length && (
            <div className="country-detail__borders">
              <b>Border Countries:</b>{" "}
              {Object.keys(borderCountryNames).map((cca3) => (
                <button
                  key={cca3}
                  onClick={() => navigate(`/country/${cca3}`)}
                  className="country-detail__button is-small"
                >
                  {borderCountryNames[cca3]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>Country not found</div>
  );
};

export default CountryDetail;
