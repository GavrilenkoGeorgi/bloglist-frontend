import React from 'react'
import PropTypes from 'prop-types'

const BlogAddForm = ({
  onSubmit,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => (
  <form onSubmit={onSubmit}>
    <input
      value={title}
      onChange={handleTitleChange}
    /><br />
    <input
      value={author}
      onChange={handleAuthorChange}
    /><br />
    <input
      value={url}
      onChange={handleUrlChange}
    /><br />
    <button type="submit">create</button>
  </form>
)

BlogAddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogAddForm
