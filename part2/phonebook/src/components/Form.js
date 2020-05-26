import React from 'react';

const Form = ({ addContact, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form;