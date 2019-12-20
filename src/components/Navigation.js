import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Logout from './Logout'

const Navigation = ({ user }) => {
	return (
		<>
			<Link to="/">home</Link>
			<Link to="/users">users</Link>
			<Link to="/blogs">blogs</Link>
			{user.username} logged in
			<Logout />
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navigation)
