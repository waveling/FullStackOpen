import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    //For dispatching actions from the redux-store
    const dispatch = useDispatch()

    //Fetches all the blogs from the database
    useEffect(() => {
        const getAllBlogs = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        getAllBlogs()
    }, [])

    //Checks if the user data is already in local storage, so don't have to log in again
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    //Event handler for logging in
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification({
                text: 'Wrong credentials',
                style: 'error',
            }))
        }
    }

    //Event handler for liking a blog
    const handleLikes = async (blog) => {
        try {
            await blogService.update(blog.id, {
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes,
            })

            //dispatch action that alters the state in redux store
            dispatch(setNotification({
                text: `You liked the blog: "${blog.title}"`,
                style: 'success'
            }))

            const updatedBlogList = blogs.map((item) =>
                item.id === blog.id ? { ...item, likes: item.likes + 1 } : item
            )

            setBlogs(updatedBlogList)

        } catch (error) {
            dispatch(setNotification({
                text: 'Could not update the blog!',
                style: 'error'
            }))
        }
    }

    //Event handler for deleting a blog
    const handleDelete = async (blog) => {
        try {
            await blogService.deleteBlog(blog.id)
            dispatch(setNotification({
                text: `blog ${blog.title} by ${blog.author} deleted`,
                style: 'success',
            }))
            const updatedBlogList = blogs.filter((item) => item.id !== blog.id)
            setBlogs(updatedBlogList)
        } catch (error) {
            dispatch(setNotification({
                text: 'Couldn\'t delete the blog!',
                style: 'error',
            }))
        }
    }

    //Event handler for logging out and removing user data from clients local storage
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const blogFormRef = useRef()

    //Event handler for adding a blog
    const addBlog = async (title, author, url) => {
        try {
            blogFormRef.current.toggleVisibility()
            const blog = await blogService.create({
                title,
                author,
                url,
            })
            dispatch(setNotification({
                text: 'New blog was added!',
                style: 'success',
            }))
            const user = await blogService.getUser()
            setBlogs(blogs.concat({ ...blog, user }))
        } catch (error) {
            dispatch(setNotification({
                text: 'Blog not added',
                style: 'error',
            }))
        }
    }

    return (
        <div>
            <Notification />
            {user === null ? (
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            ) : (
                    <div>
                        <p>{user.name} is logged in</p>
                        <button onClick={handleLogout}>Logout</button>
                        <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
                            <BlogForm createBlog={addBlog} />
                        </Togglable>
                        <h2>Blogs</h2>
                        <div>
                            {blogs
                                .sort((a, b) => b.likes - a.likes)
                                .map((blog) => (
                                    <Blog
                                        key={blog.id}
                                        blog={blog}
                                        handleLikes={handleLikes}
                                        handleDelete={handleDelete}
                                    />
                                ))}
                        </div>
                    </div>
                )}
        </div>
    )
}

export default App
