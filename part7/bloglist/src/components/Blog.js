import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blog = () => {
    //get blogs from store
    const blogs = useSelector(state => state.blogs)

    return (
        <div>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <ul key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                    </ul>
                ))
            }
        </div>
    )
}

export default Blog
