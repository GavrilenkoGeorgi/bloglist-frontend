import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { Container, Form, Button } from 'react-bootstrap'

const BlogAddForm = (props) => {
	// eslint-disable-next-line no-unused-vars
	const { reset: resetTitle, ...title } = useField('text')
	// eslint-disable-next-line no-unused-vars
	const { reset: resetAuthor, ...author } = useField('text')
	// eslint-disable-next-line no-unused-vars
	const { reset: resetUrl, ...url } = useField('text')

	useEffect(() => {
		blogService.setToken(props.user.token)
	}, [props.user])

	const addBlog = (event) => {
		event.preventDefault()

		const blogObject = {
			title: title.value,
			author: author.value,
			url: url.value,
			likes: 0
		}

		props.createBlog(blogObject)
			.then(() => {
				props.setNotification({ message: 'Blog successfully added.', variant: 'success' }, 5)
			})
			.catch(error => {
				const notification = JSON.parse(error.request.responseText)
				props.setNotification({ message: notification.error, variant: 'danger' }, 5)
			})
		resetTitle('')
		resetAuthor('')
		resetUrl('')
	}

	return (
		<Container>
			<h2>Blog add form</h2>
			<Form data-cy="addBlogForm" data-testid="addBlogForm" onSubmit={addBlog}>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control
						data-cy="newTitle"
						name="title"
						data-testid="title"
						{...title}
					/>
					<Form.Label>Author</Form.Label>
					<Form.Control
						data-cy="newAuthor"
						{...author}
					/>
					<Form.Label>Url</Form.Label>
					<Form.Control
						data-cy="newUrl"
						{...url}
					/>
					<Button
						className="my-3"
						data-cy="createBlogBtn"
						type="submit"
						variant="primary"
					>
						create
					</Button>
				</Form.Group>
			</Form>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	createBlog,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogAddForm)
