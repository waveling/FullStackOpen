import React from 'react';

const BlogForm = ({ handleBlog }) => {
  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={handleBlog}>
        <p>Title:<input></input></p>
        <p>Author:<input></input></p>
        <p>Url:<input></input></p>
      </form>
    </div>
  )
}

export default BlogForm;