import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

/**
 * Set notification
 * @param {string} notification text
 */

const Notification = ({ notification }) => { // type?
	const currentType = 'success'
	return (
		<>
		{(notification &&
			<Alert className="my-3" variant={currentType}>
				{notification}
			</Alert>
		)}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

export default connect(
	mapStateToProps
)(Notification)
