import React from 'react';

const Display = ({ persons, deleteContact }) => {

  return (
      persons.map(person => 
        <p key={Math.random()}>
          {person.name} {person.number}
          <button onClick={() => deleteContact(person.id, person.name)}>Delete</button>
        </p>
    )   
  )
}

export default Display;