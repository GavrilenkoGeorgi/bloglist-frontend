import React, {useState} from 'react'

const Blog = ({ blog }) => {
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
        <button type="button">like</button>
        <br />
        added by {blog.author}
      </div>
    </div>
  </div>
)}

export default Blog
