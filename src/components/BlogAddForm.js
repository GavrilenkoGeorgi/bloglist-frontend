import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useField } from '../hooks'

const BlogAddForm = ({ blogs, setBlogs, notificationCallback }) => {
  // eslint-disable-next-line no-unused-vars
  const { reset: resetTitle, ...title } = useField('text')
  // eslint-disable-next-line no-unused-vars
  const { reset: resetAuthor, ...author } = useField('text')
  // eslint-disable-next-line no-unused-vars
  const { reset: resetUrl, ...url } = useField('text')

  const addBlog = event => {
    event.preventDefault()

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        resetTitle('')
        resetAuthor('')
        resetUrl('')
      }).catch(error => {
        notificationCallback({ type: 'ERROR', message: error.message })
        setTimeout(() => {
          notificationCallback(null)
        }, 5000)
      }).finally(() => { //? this doesn't belong here
        notificationCallback({ type: 'SUCCESS', message: `Blog added ${blogObject.title} ${blogObject.author}` })
        setTimeout(() => {
          notificationCallback(null)
        }, 5000)
      })
  }

  return (
    <form onSubmit={addBlog}>
      <input
        {...title}
      /><br />
      <input
        {...author}
      /><br />
      <input
        {...url}
      /><br />
      <button type="submit">create</button>
    </form>
  )
}

/*
BlogAddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}*/

BlogAddForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  notificationCallback: PropTypes.func.isRequired
}

export default BlogAddForm