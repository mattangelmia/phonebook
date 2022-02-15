import React from "react";

export default function Countries(props) {
  if (props.countries.length === 1) {
    return (
      <div style={{ marginTop: "2vh" }}>
        <h5>{props.conditionalStatement}</h5>
        {props.countries.map((country) => (
          <div
            style={{ listStyleType: "none", marginBottom: "8vh" }}
            key={country.name.official}
          >
            <h3>{country.name.official}</h3>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <img src={country.flags.png} />
            <h4>Weather in {country.capital[0]}</h4>
            <p>Temperature: {props.weatherData} celcius</p>
            <p>{props.weatherDescription}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ marginTop: "5vh" }}>
      <h5>{props.conditionalStatement} </h5>
      {props.countries.map((country) => (
        <div
          style={{ listStyleType: "none", marginBottom: "8vh" }}
          key={country.name.official}
        >
          <h3>{country.name.official}</h3>
          <button onClick={() => props.showCountry(country)}>Show</button>
        </div>
      ))}
    </div>
  );
}
