import React from 'react'
import { connect } from 'react-redux'
import { initializeBlogs } from '../reducers/blogsReducer'
import CommentForm from './CommentForm'

/**
 * Single blog post view
 */

const BlogPost = ({ blog, ...props }) => {
	if (!blog) {
		props.initializeBlogs()
		return (
			<>just a sec..</>
		)
	} else {
		return (
			<>
				<h2>Single blog!</h2>
				<p>
					{blog.title} - <strong>{blog.author}</strong>
				</p>
				<div>
					<CommentForm blogId={blog.id} />
					<h3>Comments</h3>
					<ul>
						{blog.comments.map(comment =>
							<li
								key={comment.id}>
								{comment.content}
							</li>
						)}
					</ul>
				</div>
			</>
		)}
}

const blogToShow = (id, blogs) => blogs.find(blog => blog.id === id)

const mapStateToProps = (state, ownProps) => {
	return {
		blogs: state.blogs,
		blog: blogToShow(ownProps.blogId, state.blogs)
	}
}

const mapDispatchToProps = {
	initializeBlogs
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogPost)
