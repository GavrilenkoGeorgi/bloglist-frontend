import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = (props) => {
	const { reset : resetEmail, ...email } = useField('email')
	const { reset : resetPass, ...password } = useField('password')

	const handleLogin = async event => {
		event.preventDefault()
		const userCreds = {
			email: email.value,
			password : password.value
		}
		props.login(userCreds)
			.then(() => {
				props.setNotification('Logged in successfully', 5)
			})
			.catch(error => {
				const notification = JSON.parse(error.request.responseText)
				props.setNotification(notification.error, 5)
			})
			resetEmail('')
			resetPass('')
	}

	return <form data-cy="loginForm" onSubmit={handleLogin}>
		<h4>Login into application</h4>
		<div>
			email
			<input
				{...email}
				name="email"
				data-cy="emailInput"
			/>
		</div>
		<div>
			password
			<input
				{...password}
				name="password"
				data-cy="passwordInput"
			/>
		</div>
		<button type="submit" data-cy="login">login</button>
	</form>
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	login,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)
