import React, { useState } from 'react';

const Blog = ({ user, blog, handleLikes, handleDelete }) => {
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

  const removeBlog = () => {
    if (window.confirm(`Are you sure you want to delete the blog ${blog.title}?`)) {
      handleDelete(blog);
    }
  }

  const authorizeRemove = (identifiedUser) => {
    if (blog.user && identifiedUser === blog.user.name) {
      return true;
    }
  }
  
    return (
      <div className='blogItem'>
        <ul>
          {blog.title} by {blog.author}
        <button className='detailButton' onClick={handleDetails}>{details ? 'show' : 'hide'}</button>
        <div style={show}>
          <p>Likes: {blog.likes}</p>
          <p>Url: {blog.url}</p>
          <p>User: {blog.user ? blog.user.name : 'N/A'}</p>
          <button onClick={updateLikes} className='like'>like</button>
          {
            authorizeRemove(user.name) &&
             <button onClick={removeBlog} className='remove'>remove</button>
                      
          }
        </div>
        </ul>
      </div>
    )
}


export default Blog;
