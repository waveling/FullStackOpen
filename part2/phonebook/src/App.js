import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  /* Input new name in state */
  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  /* New object is added to the persons array
      -Event is the submit event */
  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName
    }
    console.log(nameObject)
    setPersons(persons.concat(nameObject));
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          {/*  */}
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* map over the name-props in objects in persons array */}
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App