import React, { useState } from 'react'

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
}

const BlogForm = ({ setNotification, createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        }

        createBlog(blogObject)
        setNewUrl('')
        setNewTitle('')
        setNewAuthor('')
        setNotification({
            text: `${newTitle} added to the blog list!`,
            type: 'success',
        })
        setTimeout(() => {
            setNotification(null)
        }, 3500)
    }

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    return (
        <div>
            <h2>Add new blog</h2>
            <form className="form" onSubmit={addBlog} style={formStyle}>
                <p>
                    Title:
                    <input
                        className="titleInput"
                        value={newTitle}
                        onChange={handleTitleChange}
                    ></input>
                </p>
                <p>
                    Author:
                    <input
                        className="authorInput"
                        value={newAuthor}
                        onChange={handleAuthorChange}
                    ></input>
                </p>
                <p>
                    Url:
                    <input
                        className="urlInput"
                        value={newUrl}
                        onChange={handleUrlChange}
                    ></input>
                </p>
                <button type="submit">Add Blog</button>
            </form>
        </div>
    )
}

export default BlogForm
