import React from "react";
import { useNavigate } from "react-router-dom";

import { Country } from "../../hooks/useCountriesHook";
import CountryCard from "../CountryCard";

import "./styles.css";

interface CountryListProps {
  countries: Country[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  const navigate = useNavigate();
  const redirectToCountryHandler = (countryCioc: string) => {
    console.log("here", countryCioc);
    navigate(`/country/${countryCioc}`);
  };

  return (
    <div className="country-list">
      {/* Paginate OR load more on scroll */}
      {countries.map((country) => (
        <CountryCard
          key={`${country.cca3}-${country.name.common}`}
          country={country}
          onClick={redirectToCountryHandler}
        />
      ))}
    </div>
  );
};

export default CountryList;
