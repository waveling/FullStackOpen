import React from 'react';

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '300px'
};

const BlogForm = ({ addBlog, newTitle, newAuthor, handleTitleChange, handleAuthorChange, newUrl, handleUrlChange }) => {
  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={addBlog} style={formStyle}>
        <p>Title:<input value={newTitle} onChange={handleTitleChange} ></input></p>
        <p>Author:<input value={newAuthor} onChange={handleAuthorChange} ></input></p>
        <p>Url:<input value={newUrl} onChange={handleUrlChange}></input></p>
        <button type='submit' style={{width: '100px', backgroundColor: 'lightblue', border: 'none', borderRadius: '20px', height: '30px'}}>Add Blog</button>
      </form>
    </div>
  )
}

export default BlogForm;