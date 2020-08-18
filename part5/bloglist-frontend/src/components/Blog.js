import React from 'react';
const Blog = ({ blog }) => {
  return (
    <ul>
      {blog.title}  {blog.author}
    </ul>
  )
}


export default Blog;
