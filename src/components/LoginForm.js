import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = (props) => {
	const { reset : resetName, ...username } = useField('text')
	const { reset : resetPass, ...password } = useField('password')

	const handleLogin = async event => {
		event.preventDefault()
		const userCreds = {
			username: username.value,
			password : password.value
		}
		props.login(userCreds)
			.catch(error => {
				props.setNotification(error.message, 5)
			})
		resetName('')
		resetPass('')
	}

	return <form data-testid="login-form" onSubmit={handleLogin}>
		<h4>Login into application</h4>
		<div>
			username
			<input
				{...username}
			/>
		</div>
		<div>
			password
			<input
				{...password}
				name="Password"
			/>
		</div>
		<button type="submit">login</button>
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
