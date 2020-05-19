import React from 'react';
import Part from './Part'

const Content = ({ course }) => {
  return (
    course.parts.map((item, i) => {
      return <Part part={item} key={i} />
    }) 
  )
}

export default Content;