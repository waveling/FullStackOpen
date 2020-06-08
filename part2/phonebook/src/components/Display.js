import React from 'react';
import Contact from './Contact';

const Display = ({ persons, searchParam, deleteContact }) => {

  const searchOutput = persons.filter(person => person.name.toUpperCase().includes(searchParam.toUpperCase()))

  return (
    <ul>
    {
      searchOutput.map((person) => {
        return (
          <Contact key={person.name} name={person.name} number={person.number} deleteContact={deleteContact} id={person.id}/>
        )
      }) 
    }
    </ul>
    
  )
}

export default Display;