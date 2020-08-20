import React, { useState } from 'react';

const Blog = ({ blog, handleLikes }) => {
  const [details, setDetails] = useState(true);

  const show = {display: details ? 'none' : ''}

  const handleDetails = () => {
    setDetails(!details)
  }

  const updateLikes = () => {
    handleLikes({
      ...blog,
      likes: blog.likes + 1,
    })
  }
    
    return (
      <div className='blogItem'>
        <ul>
          {blog.title} by {blog.author}
        <button className='detailButton' onClick={handleDetails}>{details ? 'show' : 'hide'}</button>
        <div style={show}>
          <p>Likes: {blog.likes}<button onClick={updateLikes} className='detailButton'>like</button></p>
          <p>Url: {blog.url}</p>
          <p>User: {blog.user ? blog.user.name : 'N/A'}</p>
        </div>
        </ul>
      </div>
    )
}


export default Blog;
