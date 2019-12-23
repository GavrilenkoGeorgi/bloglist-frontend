import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Logout from './Logout'
import { Navbar, Nav } from 'react-bootstrap'

const NavigationBar = ({ user }) => {
	return (
		<header>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="">

						<Nav.Link href="#" as="span">
							<Link to="/">home</Link>
						</Nav.Link>

						<Nav.Link href="#" as="span">
							<Link to="/users">users</Link>
						</Nav.Link>
							
						<Nav.Link href="#" as="span">
							<Link to="/blogs">blogs</Link>
						</Nav.Link>

						<Nav.Link href="#" as="span">
							{user
								? <>
										<em>
											{user.username} logged in
										</em>
										<Logout />
									</>
								: <Link to="/login">login</Link>
							}
						</Nav.Link>

					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
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
)(NavigationBar)
