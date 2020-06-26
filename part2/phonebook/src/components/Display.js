import React from 'react';

const Display = ({ persons, searchParam, deleteContact }) => {

  return (
      persons.map(person => 
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteContact(person.id, person.name)}>Delete</button>
        </p>
    )   
  )
}

export default Display;