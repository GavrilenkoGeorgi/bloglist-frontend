import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogAddForm from './components/BlogAddForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = (props) => {

  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('New title')
  const [author, setAuthor] = useState('New author')
  const [url, setUrl] = useState('New url')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        initialBlogs.sort(function (a, b) {
          return a.likes - b.likes
        })
        setBlogs(initialBlogs.reverse())
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // console.log('User id', user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const addBlog = event => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      }).catch(error => {
          setErrorMessage(`Can't add blog: ${error.message}`)
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).finally(() => {
          setErrorMessage(`Blog added ${blogObject.title} ${blogObject.author}`)
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    try {
      localStorage.removeItem('loggedBlogappUser')
      document.location.href='/'
    } catch (exception) {
      setErrorMessage('Can\'t logout')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }

  const loginForm = () => (
    <>
      <h4>Login into application</h4>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogAddForm
          onSubmit={addBlog}
          author={author}
          title={title}
          url={url}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
      />
    </Togglable>
  )

  const updateLikes = (blog) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    blogService
      .update(blog.id, blogObject)
      /*
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })*/
      .catch(error => {
          setErrorMessage(`Can't update blog: ${error.message}`)
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).finally(() => {
          setErrorMessage(`Blog updated ${blogObject.title} ${blogObject.author}`)
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = id => {
    // console.log('Deleting blog with id >>', id)
    if (window.confirm(`Do you really want to delete blog with id of: ${id}?`)) {
      blogService
      .deleteBlog(id)
      .then(response => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
      .catch(error => {
        setErrorMessage(`Can't delete blog: ${error.message}`)
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
      }).finally(() => {
        setErrorMessage(`Blog deleted ${id}`)
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />

      <h2>Login</h2>

      {user === null ?
        loginForm() :
        <div>
          <p>
            {user.name} logged in
          </p>
          <button
            type="button"
            onClick={handleLogout}
            >
              Logout
          </button>
          {blogForm()}
          <h2>Blogs</h2>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdate={updateLikes}
                handleDelete={deleteBlog}
                currentUserName={user.username}
              />
            )}
        </div>
      }
    </div>
  )
}

export default App
