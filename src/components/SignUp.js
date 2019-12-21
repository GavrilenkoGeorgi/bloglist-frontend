import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import usersService from '../services/usersList' // users!

const SignUp = (props) => {
	const { reset : resetName, ...username } = useField('text')
	const { reset : resetEmail, ...email } = useField('email')
	const { reset : resetPass, ...password } = useField('password')

	const handleSignUp = async event => {
		event.preventDefault()
		const userCreds = {
			email: email.value,
			username: username.value,
			password : password.value
		}
		usersService.signUp(userCreds)
			.then(() => {
				props.setNotification('Signup successful', 5)
				resetName('')
				resetEmail('')
				resetPass('')
				document.location.href='/'
			})
			.catch(error => {
				const notification = JSON.parse(error.request.responseText)
				props.setNotification(notification.error, 5)
			})
	}

	return <form data-cy="signUpForm" onSubmit={handleSignUp}>
		<h4>New user sign up</h4>
		<div>
			email
			<input
				{...email}
				name="email"
			/>
		</div>
		<div>
			username
			<input
				{...username}
				name="name"
			/>
		</div>
		<div>
			password
			<input
				{...password}
				name="password"
			/>
		</div>
		<button type="submit" data-cy="signup">sign up</button>
	</form>
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
)(SignUp)
