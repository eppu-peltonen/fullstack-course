import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sendMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      sendMessage('wrong credentials')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const loginForm = () => {
    return(
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </Togglable>
    )
  }

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    sendMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
  }

  const blogForm = () => (
    <Togglable buttonLabel='add new blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={message} />
      {
        user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            {blogForm()}
            {blogList()}
          </div>
      }
    </div>
  )
}

export default App