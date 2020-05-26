import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Form from './components/Form';
import Display from './components/Display';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchParam, setSearchParam] = useState('')

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  /* Input new name in state */
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const addContact = (event) => {
    event.preventDefault();
    const contactObject = {
      name: newName,
      number: newNumber
    }
    persons.some(person => person.name === newName || person.number === newNumber) 
    ? window.alert(`The contact ${newName} already exists!`)
    : setPersons(persons.concat(contactObject));
      setNewName('')
      setNewNumber('')  
  }

  const searchInput = (event) => {
    setSearchParam(event.target.value)
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Search 
        searchParam={searchParam} 
        searchInput={searchInput}
      />
      <h2>Add new contact</h2>
      <Form 
        addContact={addContact} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newName={newName} 
        newNumber={newNumber} 
      />
      <h2>Contacts</h2>
      <Display 
        persons={persons}
        searchParam={searchParam}
      />
    </div>
  )
}

export default App