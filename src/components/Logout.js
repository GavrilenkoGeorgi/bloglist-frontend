import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Logout = ({ setNotification }) => {

	const handleLogout = async event => {
		event.preventDefault()
		try {
			window.localStorage.removeItem('loggedUserJSON')
			document.location.href='/'
			setNotification('Successfully logged out.', 3)
		} catch (exception) {
			setNotification(exception.message, 3)
		}
	}

	return <button
		type="button"
		data-cy="logoutBtn"
		onClick={handleLogout}>
		Logout
	</button>
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
)(Logout)
