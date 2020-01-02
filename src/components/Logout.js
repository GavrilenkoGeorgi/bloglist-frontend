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
			setNotification({ 
				message: 'Successfully logged out.',
				variant: 'info'
			}, 3)
		} catch (error) {
			const notification = JSON.parse(error.request.responseText)
			setNotification({
				message: notification.error,
				variant: 'danger',
			}, 5)
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
