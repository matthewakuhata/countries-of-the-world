import React, { useEffect, useState } from "react";
import CountryList from "../components/CountryList/CountryList";
import Filter from "../components/Filter";
import LoadingBar from "../components/LoadingBar/LoadingBar";
import SearchBar from "../components/SearchBar";
import { useCountries } from "../hooks/useCountriesHook";

import "./Home.css";

const REGION_OPTIONS = ["Africa", "America", "Asia", "Europe", "Oceania"];
const PAGE_LIMIT = 10;
const Home = () => {
  const { countries, loading, setRegion, setSearchedName } = useCountries();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const listener = (e: any) => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

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

  return (
    <div className="home">
      <header>
        <SearchBar onChange={changeSearchHandler} />
        <Filter options={REGION_OPTIONS} onSelect={changeRegionHandler} />
      </header>
      {loading ? (
        <LoadingBar />
      ) : (
        <CountryList countries={countries.slice(0, page * PAGE_LIMIT)} />
      )}
    </div>
  );
};

export default Home;
