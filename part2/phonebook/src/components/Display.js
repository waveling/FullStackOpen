import React from 'react';

const Display = ({ persons, searchParam }) => {

  const searchOutput = persons.filter(person => person.name.toUpperCase().includes(searchParam.toUpperCase()))

  return (
    <div>
    {
      searchOutput.map((person) => {
        return <p key={person.name}>{person.name} {person.number}</p>
      }) 
    }
    </div>
    
  )
}

export default Display;