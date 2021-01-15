import React, { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { setLogout, checkLocalStorage } from './reducers/userReducer'

const App = () => {
    //For dispatching actions from the redux-store
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    //Fetches all the blogs from the database
    useEffect(() => {
        dispatch(initBlogs())
    }, [dispatch])

    //Checks if the user data is already in local storage, so don't have to log in again
    useEffect(() => {
        dispatch(checkLocalStorage())
    }, [dispatch])

    //Event handler for logging out and removing user data from clients local storage
    const handleLogout = () => {
        dispatch(setLogout())
    }

    const blogFormRef = useRef()

    //Event handler for adding a blog
    const addBlog = async () => {
        try {
            blogFormRef.current.toggleVisibility()
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
                <LoginForm />
            ) : (
                <div>
                    <p>{user.name} is logged in</p>
                    <button onClick={handleLogout}>Logout</button>
                    <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
                        <BlogForm createBlog={addBlog} />
                    </Togglable>
                    <h2>Blogs</h2>
                    <Blog />
                </div>
            )}
        </div>
    )
}

export default App
