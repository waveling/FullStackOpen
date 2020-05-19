import React from 'react';

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, cv) => {
    return acc + cv.exercises
  }, 0)
  
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

export default Total;