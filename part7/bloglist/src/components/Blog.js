import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'

const Item = ({ blog, authorizeRemove, removeBlog }) => {
    //Local state for showing/hiding the details for each Item-component
    const [details, setDetails] = useState(false)
    const dispatch = useDispatch()

    const updateLikes = (id, newObject) => {
        dispatch(addLike(id, newObject))
    }

    const handleDetails = () => {
        setDetails(!details)
    }

    return (
        <ul key={blog.id} className='blogItem'>
            <p className="title">
                {blog.title}
                <button className="detailButton" onClick={handleDetails}>
                    {details ? 'hide' : 'show'}
                </button>
            </p>
            <p className="author">{blog.author}</p>
            {details && (
                <div className="detailedInfo">
                    <p className="likes">Likes: {blog.likes}</p>
                    <p className="url">Url: {blog.url}</p>
                    <p>User: {blog.user.username}</p>
                    <button onClick={() => updateLikes(blog.id,{ ...blog, likes: blog.likes + 1 })} className="like">
                        like
                    </button>
                    {authorizeRemove(blog.user.id) && (
                        <button className="remove" onClick={() => removeBlog(blog)}>
                            remove
                        </button>
                    )}
                </div>
            )}
        </ul>
    )
}

const Blog = () => {
    const dispatch = useDispatch()

    //get blogs from store
    const blogs = useSelector(state => state.blogs)

    const removeBlog = (blog) => {
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
    }

    return (
        <div>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Item
                        key={blog.id}
                        blog={blog}
                        authorizeRemove={authorizeRemove}
                        removeBlog={removeBlog}
                    />
                ))
            }
        </div>
    )
}

export default Blog
