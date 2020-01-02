import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Card, Button } from 'react-bootstrap'

const Blog = ({ blog, ...props }) => {
	/**
	* Handle blog delete
	* @param {string} id Blog ID
	*/

	const handleDelete = (id) => {
		if (window.confirm(`Do you really want to delete blog with id of: ${id}?`)) {
			props.deleteBlog(id)
				.then(() => {
					props.setNotification({
						message: 'Blog successfully deleted',
						variant: 'success'
					}, 5)
				})
				.catch(error => {
					const notification = JSON.parse(error.request.responseText)
					props.setNotification({
						message: notification.error,
						variant: 'danger'
					 }, 5)
				})
		}
	}

	const checkAuthor = (blogAuthorId) => {
		if (props.user && (props.user.id === blogAuthorId)) {
			return true
		}
		return false
	}

	return (
		<Card>
		<Card.Body>
			<Card.Title>
				<Link
					to={`/blogs/${blog.id}`}
					data-cy="blogTitleLink"
				>
					{blog.title}
				</Link>
			</Card.Title>
			<Card.Subtitle>
				{blog.author}
			</Card.Subtitle>
			<Card.Text>
				added by {blog.author}
			</Card.Text>
				{blog.url}
				<br />
				{blog.likes} likes
				<Button
					className="ml-2"
					type="button"
					variant="primary"
					onClick={() => props.addLike(blog)}
					data-cy="likeBtn"
				>
					like
				</Button>
				{ checkAuthor(blog.user.id) &&
					<Button
						className="ml-2"
						type="button"
						variant="outline-secondary"
						onClick={() => handleDelete(blog.id)
					}>
						delete
					</Button>
				}
		</Card.Body>
	</Card>
	)
}

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
