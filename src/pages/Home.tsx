import React from "react";
import { useNavigate } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import Filter from "../components/Filter";
import LoadingBar from "../components/LoadingBar/LoadingBar";
import SearchBar from "../components/SearchBar";
import { useCountries } from "../hooks/useCountriesHook";

import "./Home.css";

const REGION_OPTIONS = ["Africa", "America", "Asia", "Europe", "Oceania"];

const Home = () => {
  const navigate = useNavigate();
  const { countries, loading, setRegion, setSearchedName } = useCountries();

  const changeRegionHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;

    if (!value) {
      setRegion(null);
    } else {
      setRegion(value);
    }
  };

  const changeSearchHandler = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
    setSearchedName(event.currentTarget.value || null);
  };

  const redirectToCountryHandler = (countryCioc: string) => {
    console.log("here", countryCioc);
    navigate(`/country/${countryCioc}`);
  };
  return (
    <div className="home">
      <header>
        <SearchBar onChange={changeSearchHandler} />
        <Filter options={REGION_OPTIONS} onSelect={changeRegionHandler} />
      </header>
      {loading ? (
        <LoadingBar />
      ) : (
        <div className="home__country-list">
          {/* Paginate OR load more on scroll */}
          {countries.map((country) => (
            <CountryCard
              key={`${country.cca3}-${country.name.common}`}
              country={country}
              onClick={redirectToCountryHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
