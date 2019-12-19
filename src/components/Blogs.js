import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { initializeBlogs } from '../reducers/blogsReducer'

const Blogs = ( { blogs, ...props }) => {

	useEffect(() => {
		props.initializeBlogs()
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<h2>Blogs</h2>
			<ul>
				{blogs.map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
					/>
				)}
			</ul>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}
}

const mapDispatchToProps = {
	initializeBlogs
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Blogs)
