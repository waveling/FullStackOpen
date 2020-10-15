import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLikes, handleDelete }) => {
    const [details, setDetails] = useState(false)

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
        if (
            window.confirm(
                `Are you sure you want to delete the blog ${blog.title}?`
            )
        ) {
            handleDelete(blog)
        }
    }

    const authorizeRemove = (identifiedUser) => {
        const user = blogService.getUser()
        return user.id === identifiedUser
    }

    return (
        <div className="blogItem">
            <ul>
                <p className="title">
                    {blog.title}
                    <button className="detailButton" onClick={handleDetails}>
                        {details ? 'hide' : 'show'}
                    </button>
                </p>
                <p className="author">{blog.author}</p>
                {details && (
                    <div>
                        <p className="likes">Likes: {blog.likes}</p>
                        <p className="url">Url: {blog.url}</p>
                        <p>User: {blog.user ? blog.user.name : 'N/A'}</p>
                        <button onClick={updateLikes} className="like">
                            like
                        </button>
                        {authorizeRemove(blog.user.id) && (
                            <button onClick={removeBlog} className="remove">
                                remove
                            </button>
                        )}
                    </div>
                )}
            </ul>
        </div>
    )
}

export default Blog
