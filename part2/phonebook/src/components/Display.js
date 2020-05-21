import React from 'react';

const Display = (props) => {

  const searchOutput = props.persons.filter(person => person.name.toUpperCase().includes(props.searchParam.toUpperCase()))

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