import React from 'react'

const BlogAddForm = (props) => (

  <form onSubmit={props.onSubmit}>
    <input
      value={props.title}
      onChange={props.handleTitleChange}
    /><br />
    <input
      value={props.author}
      onChange={props.handleAuthorChange}
    /><br />
    <input
      value={props.url}
      onChange={props.handleUrlChange}
    /><br />
    <button type="submit">save</button>
  </form>
)

export default BlogAddForm
