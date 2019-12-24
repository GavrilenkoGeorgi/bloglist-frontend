import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

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

	return (
		<>
			<Button
				onClick={handleLogout}
				type="button"
				data-cy="logoutBtn"
				variant="outline-secondary"
				className="mx-3"
			>
				Logout
			</Button>
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
)(Logout)
