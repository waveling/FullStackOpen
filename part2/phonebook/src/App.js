import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Form from './components/Form';
import Display from './components/Display';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
	const [searchParam, setSearchParam] = useState('');
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  //Event handlers for Name and Number changes in the input fields (saves these in state)
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
	
	//Delete person from database (prompt a confirmation)
  const handleDelete = (id, name) => {
			return () => {
				if (window.confirm(`Are you sure you want to delete the contact ${name}`)) {
					personsService
					.deleteContact(id)
					.then(() => {
						setPersons(persons.filter(person => person.id !== id));
						setNewName('');
						setNewNumber('');
					})
					}
				}
  }

	//Add person to database
  const addContact = event => {
    event.preventDefault();
    const contactObject = {
      name: newName,
      number: newNumber
		}
		//If a contact with same name exists -> update contact
    if (persons.some(person => person.name === newName)) {
			const contact = persons.filter(person => person.name === newName)
			if (window.confirm(`Number for contact ${newName} already exists. Do you want to replace?`))
			personsService
				.updateContact(contact[0].id, contactObject)
				.then(() => {
					personsService
						.getAll()
						.then(response => setPersons(response.data))
						setNewName('');
						setNewNumber('');
						setSuccessMessage(`Updated number for ${newName}`)
						setTimeout(() => {
							setSuccessMessage(null)
						}, 3000)
					})
				.catch(() => {
					setErrorMessage(`${newName} was already deleted from the server.`);
					setPersons(persons.filter(person => person.id !== contact[0].id));
					setNewNumber('');
					setNewName('');
				})
				setTimeout(() => {
					setErrorMessage(null)
				}, 3000)
		//If a brand new contact -> add to persons db
		} else {
				setPersons(persons.concat(contactObject));
				setNewName('');
				setNewNumber('');  
				personsService.createContact(contactObject);
				personsService
					.getAll()
					.then(response => {
					setPersons(response.data)
				})
			 	setSuccessMessage(`Added contact for ${newName}`)
				setTimeout(() => {
				 setSuccessMessage(null)
				}, 3000)
			}
	}

	//Event handler for setting the inputted text in state for Search input
  const searchInput = (event) => {
    setSearchParam(event.target.value)
  }


  return (
    <div>
			<Notification 
				successMessage={successMessage} 
				errorMessage={errorMessage}
			/>
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
				deleteContact={handleDelete}
      />
    </div>
  )
}

export default App