import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Blog = ({ blog, ...props }) => {
	const blogStyle = { // ??
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	useEffect(() => {
		blogService.setToken(props.user.token)
	}, [props.user])

	const [visible, setVisible] = useState(false)
	const showWhenVisible = { display: visible ? '' : 'none' }

	/**
	* Handle blog delete
	* @param {string} id Blog ID
	*/

	const handleDelete = (id) => {
		if (window.confirm(`Do you really want to delete blog with id of: ${id}?`)) {
			props.deleteBlog(id)
				.catch(error => {
					const notification = JSON.parse(error.request.responseText)
					props.setNotification(notification.error, 5)
				})
				.finally(props.setNotification('Blog successfully deleted', 5))
		}
	}

	return (
		<div style={blogStyle}>
			<div onClick={() => setVisible(!visible)}>
				<Link to={`/blogs/${blog.id}`}>
					{blog.title}
				</Link>
				{blog.author}
				<div style={showWhenVisible} className="more-info">
					{blog.url}
					<br />
					{blog.likes} likes
					<button type="button" onClick={() => props.addLike(blog)}>
						like
					</button>
					<br />
						added by {blog.author}
					<br />
						Author id is: {blog.user.username} <br />
						Current user id is: { props.user.username} <br />
					{props.user.username === blog.user.username &&
						<button type="button" onClick={() => handleDelete(blog.id)}>
							delete
						</button>
					}
				</div>
			</div>
		</div>
	)}

Blog.propTypes = {
	blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	addLike,
	deleteBlog,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Blog)
