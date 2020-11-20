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
	const [ searchParam, setSearchParam ] = useState('');
	const [ successMessage, setSuccessMessage ] = useState(null);
	const [ errorMessage, setErrorMessage ] = useState(null);

  useEffect(() => {
		personsService
			.getAll()
			.then(response => {
      	setPersons(response.data)
    	})
  }, []);

  //Event handlers for Name and Number changes in the input fields (saves these in state)
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
	}
	
	const handleSearchParam = (event) => {
		setSearchParam(event.target.value)
	}
	
	//Delete person from database (prompt a confirmation)
  const handleDelete = (id, name) => {
				const confirmed = window.confirm(`Are you sure you want to delete the contact ${name}`)
				if (confirmed) {
					personsService
						.deleteContact(id)
						.then(() => {
							setPersons(persons.filter(person => person.id !== id));
							setNewName('');
							setNewNumber('');
							setSuccessMessage(`${name} was succesfully removed from the phonebook!`)
							setTimeout(() => {
								setSuccessMessage(null)
							}, 3000)
						})
						.catch(() => {
							setPersons(persons.filter(person => person.id !== id))
							setErrorMessage(`${name} was already removed from server`, 'error')
						})
				}
  }

	//Add or update person to database
  const addContact = event => {
		event.preventDefault();
		
    const contactObject = {
      name: newName,
			number: newNumber
		};

		//If a contact with same name exists -> update contact
		const oldContact = persons.find(person => person.name === newName)
    if (oldContact) {
			const confirmed = window.confirm(`Number for contact ${newName} already exists. Do you want to replace?`)
			if (confirmed) {
				personsService
					.updateContact(oldContact.id, contactObject)
					.then(updatedContact => {
						setPersons(persons.map(person => person.id !== oldContact.id ? person : updatedContact.data))
						setSuccessMessage(`Updated number for ${newName}`);
						setNewName('');
						setNewNumber('');
						setTimeout(() => {
							setSuccessMessage(null)
						}, 3000)
					})
					.catch(error => {
						console.log(error.response.data)
						setErrorMessage(`Could not update the contact`)
						setTimeout(() => {
							setErrorMessage(null)
						}, 3000)
					})
		//If a brand new contact -> add to persons db
		}} else {
			personsService
				.createContact(contactObject)
				.then(() => {
					setPersons(persons.concat(contactObject))
					setSuccessMessage(`Added contact for ${newName}`)
					setNewName('')
					setNewNumber('')  
					setTimeout(() => {
						setSuccessMessage(null)
					}, 3000)
				})
				.catch(error => {
					console.log(error.response.data.error)
					setErrorMessage('Could not add the contact!')
					setTimeout(() => {
						setErrorMessage(null)
					}, 3000)
				})
				}
	}

	//Defines what contacts to show based on search input
	const displayedContacts = searchParam.length === 0
		? persons
		: persons.filter(person => person.name.toLowerCase().indexOf(searchParam.toLowerCase()) >= 0)


  return (
    <div>
			<Notification 
				successMessage={successMessage} 
				errorMessage={errorMessage}
			/>
      <h1>Phonebook</h1>
      <Search 
        searchParam={searchParam} 
        handleSearch={handleSearchParam}
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
        persons={displayedContacts}
        searchParam={searchParam}
				deleteContact={handleDelete}
      />
    </div>
  )
}

export default App