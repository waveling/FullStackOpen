import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

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
      });

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );
      
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('Wrong credentials!');
      setTimeout(() => {
        console.log('setNotification');
      }, 3500);
    }
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    };

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      });
    setNewUrl('');
    setNewTitle('');
    setNewAuthor('');

  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

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
            <p>{user.name} is logged in</p>
            <button 
              onClick={handleLogout}
              style={{width: '100px', backgroundColor: 'lightblue', border: 'none', borderRadius: '20px', height: '30px'}}>Logout</button>
            <BlogForm 
              addBlog={addBlog}
              newTitle={newTitle}
              newAuthor={newAuthor}
              newUrl={newUrl}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleUrlChange={handleUrlChange}
            />
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