import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import User from './User'
import { getUsersList } from '../reducers/usersReducer'
import { ListGroup } from 'react-bootstrap'

const UsersList = (props) => {
	useEffect(() => {
		props.getUsersList()
		// eslint-disable-next-line
	}, [])

	if (props.users) {
		return (
			<>
				<h3>Users</h3>
				<ListGroup variant="flush">
						{props.users.map(user =>
							<ListGroup.Item
								key={user.id}
							>
							<User
								key={user.id}
								userData={user}
							/>
							</ListGroup.Item>
						)}
				</ListGroup>
			</>
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
