import React from 'react';

const Contact = ({ name, number, deleteContact, id }) => {
  return (
    <li> { name } { number } <button onClick={deleteContact(id, name)}>Delete</button></li>
  )
}

export default Contact;