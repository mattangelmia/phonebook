import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Form from "./Form";
import Contacts from "./Contacts";
import Countries from "./Countries";
import SearchCountry from "./SearchCountry";

function App() {
  const [conditionalStatement, setConditionalStatement] = useState("");
  const [countriesAmount, setCountriesAmount] = useState(0);
  const [weatherTemp, setWeatherTemp] = useState(0);
  const [weatherInfo, setWeatherInfo] = useState([]);
  const [weatherDescription, setWeatherDescription] = useState("");
  const [singleCountry, setSingleCountry] = useState("");
  const [capitalCity, setCapitalCity] = useState("washhington");
  const [showButtonClicked, setShowButtonClicked] = useState(false);
  const [resultLength, setResultLength] = useState(0);
  const [newName, setNewName] = useState("");
  const [countries, setCountries] = useState([]);
  const [disabledState, setDisabledState] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [number, setNumber] = useState(0);
  const [persons, setPersons] = useState([]);
  const [searchCountryValue, setSearchCountryValue] = useState("");

  const showCountry = (country) => {
    console.log(country.name.official);
    let clickedCountry = countries.filter(
      (c) => c.name.official === country.name.official
    );
    console.log(clickedCountry[0].latlng[0], clickedCountry[0].latlng[1]);
    setCountries(clickedCountry);
    console.log(clickedCountry);

    setShowButtonClicked(true);
    const newWeatherInfo = [...weatherInfo];
    setWeatherInfo({
      latitude: clickedCountry[0].latlng[0],
      longitude: clickedCountry[0].latlng[1],
      temperature: clickedCountry[0],
    });
  };

  const showingCountries =
    searchCountryValue === ""
      ? []
      : countries.filter((country) =>
          country.name.official
            .toLowerCase()
            .includes(searchCountryValue.toLocaleLowerCase())
        );

  useEffect(() => {
    const params = {
      access_key: "e114490646d358a24c834e7e0b246d83",
      query: capitalCity,
    };

    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        const apiResponse = response.data;
        console.log(apiResponse.current.temperature);
        console.log(apiResponse);
        // setWeatherTemp(apiResponse.current.temperature)
        // setWeatherDescription(apiResponse.current.weather_descriptions[0])
      })
      .catch((error) => {
        console.log(error);
      });
  }, [singleCountry]);

  // e114490646d358a24c834e7e0b246d83

  const conditionalHeader =
    searchCountryValue === "" ? "too many matches, specify another filter" : "";

  const filterCountries = (e) => {
    setSearchCountryValue(e.target.value);
    setResultLength(showingCountries.length);
    setShowButtonClicked(false);
    setWeatherInfo([]);

    if (showingCountries.length === 1) {
      setCountriesAmount(1);
      setSingleCountry(searchCountryValue);
      setCapitalCity(showingCountries[0].capital[0]);
      console.log(showingCountries[0].capital[0]);
    } else {
      console.log("too many countries");
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://api.openweathermap.org/data/2.5/weather?lat=${weatherInfo.latitude}&lon=${weatherInfo.longitude}&appid=ec96eb69ca0cc00e6fb542d20ed260f4`)
  //     .then(response => {
  //       console.log(response.data)
  //       setWeatherData([response.data])
  //     })

  // }, [])
  useEffect(() => {
    axios.get("http://localhost:3004/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, [searchCountryValue]);

  const languages = countries.map((country) => country.languages);

  const setQuery = (e) => {
    setNewName(e.target.value);

    setDisabledState(false);
  };

  const setSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const numberChange = (e) => {
    console.log(e.target.value);
    setNumber(e.target.value);
  };

  const showingContacts =
    searchValue === ""
      ? persons
      : persons.filter((c) =>
          c.name.toLowerCase().includes(searchValue.toLowerCase())
        );
  const addContact = (e) => {
    e.preventDefault();
    const newContact = {
      name: newName,
      number: number,
    };

    setNewName("");
    setNumber("");
    console.log(searchValue);

    persons.map((person) => {
      if (person.name === newName) {
        alert(`${newName} is already added to the phonebook`);
        setPersons([...persons]);
        setDisabledState(true);
      } else {
        console.log("does not exist");
        setPersons(persons.concat(newContact));
      }
    });

    axios.post("http://localhost:3004/persons", newContact).then((response) => {
      setPersons(persons.concat(response.data));
    });
  };

  const removeContact = (person) => {
    console.log("deleted");
    console.log(person);
    console.log(persons);
    let filtered = persons.filter((c) => c !== person);
    setPersons(filtered);
  };

  return (
    <div className="App">
      <Form
        handleSearch={setSearch}
        handleFormChange={setQuery}
        addContact={addContact}
        value={newName}
        disabledValue={disabledState}
        placeholder={"Enter name"}
        handleNumberChange={numberChange}
        searchValue={searchValue}
      />
      <Contacts contacts={showingContacts} removeContact={removeContact} />
      <SearchCountry
        value={searchCountryValue}
        filterCountries={filterCountries}
      />
      <Countries
        weatherDescription={weatherDescription}
        weatherData={weatherTemp}
        showCountry={showCountry}
        showButtonClicked={showButtonClicked}
        countries={showingCountries}
        conditionalStatement={conditionalHeader}
        resultLength={resultLength}
      />
    </div>
  );
}

export default App;
