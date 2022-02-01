import logo from './logo.svg';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import Form from './Form'
import Contacts from './Contacts';
import Countries from './Countries';
import SearchCountry from './SearchCountry';

function App() {
const [conditionalStatement, setConditionalStatement] = useState('')
const [resultLength, setResultLength] = useState(0)
const [newName, setNewName] = useState('')
const [countries, setCountries] = useState([])
const [disabledState, setDisabledState] = useState(false)
const [searchValue, setSearchValue] = useState('')
const [number, setNumber] = useState(0)
const [persons, setPersons] = useState([])
const [searchCountryValue, setSearchCountryValue] = useState('')



const showingCountries = searchCountryValue === ''
? []
: countries.filter((country)=>(country.name.official.toLowerCase().includes(searchCountryValue.toLocaleLowerCase())))


const conditionalHeader = searchCountryValue === ""
? "too many matches, specify another filter"
: ""

const filterCountries = (e) =>{
  setSearchCountryValue(e.target.value)
  console.log(showingCountries.length)
  setResultLength(showingCountries.length)
}


useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3004/persons')
    .then(response => {
      setPersons(response.data)
    })
}, [])


useEffect(() => {
  console.log('effect')
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {

      setCountries(response.data)

    })
}, [])




const languages = countries.map(country=>country.languages)



  
  const setQuery = (e) =>{
setNewName(e.target.value)

setDisabledState(false)
  }

const setSearch = (e) => {
  setSearchValue(e.target.value)

}


 const  numberChange = (e) => {
  console.log(e.target.value)
  setNumber(e.target.value)
 }




 const showingContacts = searchValue === ''
 ? persons
 : persons.filter((c)=>(
     c.name.toLowerCase().includes(searchValue.toLowerCase())
 ))


 
  

  const addContact = (e) =>{
      console.log('hello')
      e.preventDefault()
      console.log(newName)
      const newContact = {
        name: newName,
        id: persons.length + 1,
        number: number
      }

      setNewName('')
      setNumber('')
      console.log(searchValue)

persons.map(function (person){
  if(person.name === newName){
    alert(`${newName} is already added to the phonebook`)
    setPersons([...persons])
    setDisabledState(true)
  }
  else{
    console.log('does not exist')
    setPersons(persons.concat(newContact))
   
  }
})









   
  }


  return (
  
    <div className="App">
   
   <Form handleSearch={setSearch} handleFormChange={setQuery} addContact={addContact} value={newName} disabledValue={disabledState} placeholder={'Enter name'} handleNumberChange={numberChange} searchValue={searchValue}/>

  <Contacts contacts={showingContacts} />
  <SearchCountry value={searchCountryValue} filterCountries={filterCountries}/>
  <Countries countries={showingCountries} conditionalStatement={conditionalHeader} resultLength={resultLength}/>
  
    </div>
  );
}

export default App;
