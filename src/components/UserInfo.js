import React from 'react'
import { connect } from 'react-redux'
import { getUsersList } from '../reducers/usersReducer'

const UserInfo = ({ userId, ...props }) => {
	if (props.users) {
		const userById = (id) =>
			props.users.find(user => user.id === id)
		const userBlogs = userById(userId).blogs

		return (
			<>
				<p>user info {userId} </p>
				{userBlogs.map(blog =>
					<div
						key={blog.id}
					>{blog.title}</div>
				)}
			</>
		)
	} else {
		props.getUsersList()
		return (
			<h4>just a sec..</h4>
		)}
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

const mapDispatchToProps = {
	getUsersList
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserInfo)
