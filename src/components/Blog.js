import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { Card, Button } from 'react-bootstrap'

const Blog = ({ blog, ...props }) => {
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
		<Card>

			<Card.Body>

				<Card.Title>
					<Link to={`/blogs/${blog.id}`}>
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
					<Button className="ml-2" type="button" variant="primary" onClick={() => props.addLike(blog)}>
						like
					</Button>
					{props.user.id === blog.user.id &&
						<Button className="ml-2" type="button" variant="outline-secondary" onClick={() => handleDelete(blog.id)}>
							delete
						</Button>
					}
			</Card.Body>
		</Card>
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
