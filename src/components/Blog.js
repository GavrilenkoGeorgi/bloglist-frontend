import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Blog = ({ blog, ...props }) => {
	const blogStyle = { // ??
		border: 'solid',
		borderWidth: 1,
		padding: 5,
		margin: 5
	}

	useEffect(() => {
		blogService.setToken(props.user.token)
	}, [props.user])

	// const [visible, setVisible] = useState(false)
	// const showWhenVisible = { display: visible ? '' : 'none' }

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
			<div>
				<Link to={`/blogs/${blog.id}`}>
					{blog.title}
				</Link>
				{blog.author}
				<div className="more-info">
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
					{props.user.id === blog.user.id &&
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
