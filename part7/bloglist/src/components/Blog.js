import React, { } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Blog = () => {
    //get blogs from store
    const blogs = useSelector(state => state.blogs)

    /* const removeBlog = (blog) => {
        if (
            window.confirm(
                `Are you sure you want to delete the blog ${blog.title}?`
            )
        ) {
            dispatch(deleteBlog(blog.id))
        }
    }

    const authorizeRemove = (identifiedUser) => {
        const user = blogService.getUser()
        if (user.id === identifiedUser) {
            return true
        }
    } */

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
