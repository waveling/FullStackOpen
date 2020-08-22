import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const test = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    test()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        text: 'Wrong credentials',
        type: 'error',
      })
      setTimeout(() => {
        setNotification(null)
      }, 3500)
    }
  }

  const handleLikes = async (blog) => {
    try {
      await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      })

      setNotification({
        text: `You liked the blog ${blog.title}`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3500)

      const updatedBlogList = blogs.map((item) =>
        item.id === blog.id
          ? { ...item, likes: item.likes + 1 }
          : item
      )

      setBlogs(updatedBlogList)

    } catch (error) {

      setNotification({
        text: 'Couldn\'t update blog',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3500)

    }
  }

  const handleDelete = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id)
      setNotification({
        text: `blog ${blog.title} by ${blog.author} deleted`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification(null)
      }, 3500)
      const updatedBlogList = blogs.filter((item) => item.id !== blog.id)
      setBlogs(updatedBlogList)
    } catch (error) {
      setNotification({
        text: 'Couldn\'t delete the blog!',
        type: 'error',
      })
      setTimeout(() => {
        setNotification(null)
      }, 3500)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  return (
    <div>
      <Notification message={notification} />
      {
        user === null
          ?
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
          :
          <div>
            <p>{user.name} is logged in</p>
            <button
              onClick={handleLogout}
            >Logout</button>
            <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
              <BlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                setNotification={setNotification}
                createBlog={addBlog}
              />
            </Togglable>
            <h2>Blogs</h2>
            <div>
              {
                blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map(blog =>
                    <Blog
                      key={blog.id}
                      blog={blog}
                      user={user}
                      handleLikes={handleLikes}
                      handleDelete={handleDelete}
                    />
                  )
              }
            </div>
          </div>

      }
    </div>
  )
}

export default App