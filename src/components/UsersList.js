import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import User from './User'
import { getUsersList } from '../reducers/usersReducer'

const UsersList = (props) => {
	useEffect(() => {
		props.getUsersList()
		// eslint-disable-next-line
	}, [])

	if (props.users) {
		return (
			<div>
				<h3>Users</h3>
				<ul>
					{props.users.map(user =>
						<User
							key={user.id}
							userData={user}
						/>
					)}
				</ul>
			</div>
		)
	} else return (
		<h4>just a sec..</h4>
	)
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
)(UsersList)
