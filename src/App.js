import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Notification from './components/Notification'
import Navigation from './components/Navigation'
import BlogAddForm from './components/BlogAddForm'
import LoginForm from './components/LoginForm'
import SignUp from './components/SignUp'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'
import BlogPost from './components/BlogPost'
import UsersList from './components/UsersList'
import UserInfo from './components/UserInfo'
import { setUserFromLocalStorage } from './reducers/userReducer'
import './css/index.css'

const App = (props) => {
	const blogFormRef = React.createRef()
	const signUpRef = React.createRef()

	useEffect(() => {
		if (!props.user) {
			const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
			if (loggedUserJSON) {
				const loggedUser = JSON.parse(loggedUserJSON)
				props.setUserFromLocalStorage(loggedUser)
			} else {
				console.log('No user.')
			}
		} else {
			window.localStorage.setItem(
				'loggedUserJSON', JSON.stringify(props.user)
			)
		}
	}, [props, props.user, props.setUserFromLocalStorage])

	return (
		<div data-testid="main">
			<Router>
				<Notification />
				<h1>Blogs app.</h1>
				{props.user ? (
					<div>
						<Navigation />
						<Route path="/login" render={() => <LoginForm />} />
						<Route exact path="/" render={() =>
							<Togglable buttonLabel="new blog" dataCy="addBlogFormToggle" ref={blogFormRef}>
								<BlogAddForm />
							</Togglable>} />
						<Route exact path="/users" render={() => <UsersList />} />
						<Route exact path="/users/:id" render={({ match }) =>
							<UserInfo userId={match.params.id} />
						} />
						<Route exact path="/blogs" render={() => <Blogs />} />
						<Route exact path="/blogs/:id" render={({ match }) =>
							<BlogPost blogId={match.params.id} />
						} />
					</div>
				) :
					<>
						<LoginForm />
							<Togglable buttonLabel="sign up" dataCy="signUp" ref={signUpRef}>
							<SignUp />
						</Togglable>
					</>}
			</Router>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setUserFromLocalStorage
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
