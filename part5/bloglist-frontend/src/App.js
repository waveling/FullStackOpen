import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      console.log('Logged in succesfully!')
      console.log(user)
    } catch (exception) {
      console.log('Wrong credentials!')
      setTimeout(() => {
        console.log('...')
      }, 3500);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  }

  return (
    <div>
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
            <p>{user.name} logged in!</p>
            <button onClick={handleLogout}>logout</button>
            <h2>Blogs</h2>
            <div>
              {
                blogs.map(blog =>
                  <Blog key={blog.id} blog={blog} user={user}/>
                )
              }
            </div>
          </div>
        
      }
    </div>
  )
}

export default App