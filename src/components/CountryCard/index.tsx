import React from "react";
import { Country } from "../../hooks/useCountriesHook";

import "./styles.css";
interface CountryCardProps {
  country: Country;
  onClick: (countryCioc: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  return (
    <div onClick={() => onClick(country.cca3)} className="country-card">
      <img src={country.flags.svg} alt={`${country.name.common} Flag`} />
      <h3>{country.name.common}</h3>
      <p>
        <b>Population:</b> {country.population}
      </p>
      <p>
        <b>Region:</b> {country.region}
      </p>
      <p>
        <b>Capital:</b> {country.capital.join(", ")}
      </p>
    </div>
  );
};

export default CountryCard;
