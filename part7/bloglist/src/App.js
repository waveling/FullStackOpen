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
import { MenuProvider } from './components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { setLogout, checkLocalStorage } from './reducers/userReducer'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
    ${reset};

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

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
                    <Wrapper>
                        <MenuProvider>
                            <Navbar
                                handleLogout={handleLogout}
                                user={user}
                            />
                        </MenuProvider>
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
                                <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
                                    <BlogForm createBlog={addBlog} />
                                </Togglable>
                                <BlogList />
                            </Route>
                        </Switch>
                    </Wrapper>
                )}
            </div>
        </Router>
    )
}

export default App
