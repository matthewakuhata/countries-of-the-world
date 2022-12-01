import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import LoadingBar from "../components/LoadingBar/LoadingBar";
import { useCountryDetails } from "../hooks/useCountryDetails";
import { formatNumber } from "../utils/formatNumber";

import "./CountryDetail.css";

const CountryDetail = () => {
  const { cioc } = useParams();
  const navigate = useNavigate();
  const { loading, countryData, borderCountryNames } = useCountryDetails(cioc);

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
