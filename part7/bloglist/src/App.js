import React, { useEffect, useRef } from 'react'
import {
    BrowserRouter as Router,
    Switch, Route
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import SingleBlog from './components/SingleBlog'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { setLogout, checkLocalStorage } from './reducers/userReducer'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

    html {
        box-sizing: border-box;
    }

    body {
        font-family: "Montserrat", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: var(--bg);
        color: var(--text);
    }

    * {
        margin: 0;
        padding: 0;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    a {
        text-decoration: none;
    }
`

const App = () => {
    //For dispatching actions from the redux-store
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    //Fetches all the blogs from the database
    useEffect(() => {
        dispatch(initBlogs())
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
        <Router>
            <div>
                <GlobalStyle />
                <Notification />
                {user === null ? (
                    <LoginForm />
                ) : (
                    <div>
                        <Navbar
                            handleLogout={handleLogout}
                            user={user}
                        />
                        <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
                            <BlogForm createBlog={addBlog} />
                        </Togglable>
                        <Switch>
                            <Route path='/users/:id'>
                                <User />
                            </Route>
                            <Route path='/blogs/:id'>
                                <SingleBlog />
                            </Route>
                            <Route path='/users'>
                                <Users />
                            </Route>
                            <Route path='/blogs'>
                                <h2>Blogs</h2>
                                <BlogList />
                            </Route>
                        </Switch>
                    </div>
                )}
            </div>
        </Router>
    )
}

export default App
