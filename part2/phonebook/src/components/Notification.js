import React from 'react';

const Notification = ({ successMessage, errorMessage }) => {

  const successStyle = {
    color: 'green',
    background: 'lighgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lighgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(successMessage === null && errorMessage === null) {
    return null
  }

  return (
    <div className="success" style={successMessage === null ? errorStyle : successStyle}>
      {
        successMessage === null ? errorMessage : successMessage
      }
    </div>
  )
}

export default Notification;