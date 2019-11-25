import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdate, handleDelete, currentUserName }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
        <div style={showWhenVisible}>
          {blog.url}
          <br />
          {blog.likes} likes
          <button type="button" onClick={() => handleUpdate(blog)}>like</button>
          <br />
        added by {blog.author}
          <br />
        Author id is: {blog.user.id} <br />
        Current user id is: {currentUserName} <br />
          {currentUserName === blog.author &&
          <button type="button" onClick={() => handleDelete(blog.id)}>delete</button>
          }
        </div>
      </div>
    </div>
  )}

Blog.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  currentUserName: PropTypes.string.isRequired
}

export default Blog
