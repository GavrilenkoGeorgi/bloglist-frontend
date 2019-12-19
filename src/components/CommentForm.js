import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { comment } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const CommentForm = (props) => {
	const { reset : resetComment, ...comment } = useField('text')

	const handleComment = async event => {
		event.preventDefault()
		const newComment = {
			blogId: props.blogId,
			content: comment.value,
		}
		props.comment(newComment)
			.catch(error => {
				props.setNotification(error.message, 5)
			})
			.finally(() => props.setNotification('Comment added', 5))
		resetComment('')
	}

	return <form data-testid="comment-form" onSubmit={handleComment}>
		<div>
			Your comment:
			<input
				{...comment}
			/>
		</div>
		<button type="submit">Comment</button>
	</form>
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	comment,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommentForm)
