import React, { useState } from 'react';
import Search from './components/Search';
import Form from './components/Form';
import Display from './components/Display';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchParam, setSearchParam] = useState('')

  /* Input new name in state */
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(newNumber)
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

  return (
    <div>
      <h1>Phonebook</h1>
      <Search 
        searchParam={searchParam} 
        setSearchParam={setSearchParam} 
      />
      <h2>Add new contact</h2>
      <Form 
        addContact={addContact} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
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