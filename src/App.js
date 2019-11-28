import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogAddForm from './components/BlogAddForm'
import blogService from './services/blogs'
import LoginFrom from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()
  const [notification, setNotification] = useState(null)

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
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (user) => {
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    setUser(user)
  }

  const handleLogout = async event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      document.location.href='/'
    } catch (exception) {
      setNotification({ type: 'ERROR', message: 'Can\'t logout' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  }

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
      /* //??
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })*/
      .catch(error => {
        setNotification({ type: 'ERROR', message: `Can't update blog: ${error.message}` })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).finally(() => {
        setNotification({ type: 'SUCCESS', message: `Blog updated ${blogObject.title} ${blogObject.author}` })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const deleteBlog = id => {
    if (window.confirm(`Do you really want to delete blog with id of: ${id}?`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
        .catch(error => {
          setNotification({ type: 'ERROR', message: `Can't update blog: ${error.message}` })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }).finally(() => {
          setNotification({ type: 'SUCCESS', message: `Blog deleted ${id}` })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  if (!user) {
    return (
      <div data-testid="main">
        <Notification {...notification} />
        <LoginFrom
          setUser={handleLogin}
          onError={message => setNotification({ type: 'ERROR', message })}
        />
      </div>
    )
  } else {
    return (
      <div data-testid="main">
        <Notification {...notification} />
        <p>
          {user.name} logged in
        </p>
        <button
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
        <h2 className="blogs-header">Blogs</h2>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogAddForm blogs={blogs} setBlogs={setBlogs} notificationCallback={setNotification} />
        </Togglable>
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
    )
  }
}

export default App
