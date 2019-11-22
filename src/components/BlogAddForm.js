import React from 'react'

const BlogAddForm = ({
  onSubmit,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
  }) => (
  // remove props, use destructuring
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

export default BlogAddForm
