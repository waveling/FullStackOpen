import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
}

const BlogForm = () => {
    const dispatch = useDispatch()

    const handleAddBlog = (event) => {
        event.preventDefault()
        dispatch(addBlog({
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }))
        dispatch(setNotification({
            text: 'New blog was added!',
            style: 'success',
        }))
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
    }

    return (
        <div>
            <h2>Add new blog</h2>
            <form className="form" onSubmit={handleAddBlog} style={formStyle}>
                <p>
                    Title:
                    <input
                        name='title'
                        className="titleInput"
                    ></input>
                </p>
                <p>
                    Author:
                    <input
                        name='author'
                        className="authorInput"
                    ></input>
                </p>
                <p>
                    Url:
                    <input
                        name='url'
                        className="urlInput"
                    ></input>
                </p>
                <button className="submit-blog-button" type="submit">
                    Add Blog
                </button>
            </form>
        </div>
    )
}

export default BlogForm
