import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogAddForm from './components/BlogAddForm'
// import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
// import blogs from './services/blogs'
// import './index.css'

const App = (props) => {
  
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState('a new Blog')
  const [title, setTitle] = useState('New title')
  const [author, setAuthor] = useState('New author')
  const [url, setUrl] = useState('New url')
  // const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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

  /*
  const handleBlogChange = event => {
    setNewBlog(event.target.value)
  } */

/*
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  )
*/


/*
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
*/
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Login')

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
    console.log('Loggin out')
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
          <BlogAddForm
              onSubmit={addBlog}
              author={author}
              title={title}
              url={url}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleUrlChange={handleUrlChange}
            />
          <h2>Blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
        </div>
      }

      {/*<div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />*/}
    </div>
  )
}

export default App
