import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

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
			.catch(error => {
				props.setNotification(error.message, 5)
			})
			.finally(() => {
				resetTitle('')
				resetAuthor('')
				resetUrl('')
				props.setNotification('Blog added', 5)
			})
	}

	return (
		<div>
			<h2>Blog add form</h2>
			<form onSubmit={addBlog}>
				<label>Title</label>
				<input
					{...title}
				/><br />
				<label>Author</label>
				<input
					{...author}
				/><br />
				<label>Url</label>
				<input
					{...url}
				/><br />
				<button type="submit">create</button>
			</form>
		</div>
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
