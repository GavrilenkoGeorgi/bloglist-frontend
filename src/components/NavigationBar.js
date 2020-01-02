import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Logout from './Logout'
import { Navbar, Nav } from 'react-bootstrap'

const NavigationBar = ({ user }) => {
	return (
		<header>
			<Navbar collapseOnSelect expand="sm" bg="light">
				<Navbar.Brand href="/">Blog app</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto pl-2 d-flex align-items-left">

							<Link to="/users" className="d-flex align-items-center">
								<Nav.Link href="#" as="span">
									Users
								</Nav.Link>
							</Link>
							
							<Link to="/blogs" className="d-flex align-items-center">
								<Nav.Link href="#" as="span">
									Blogs
								</Nav.Link>
							</Link>

						<Nav.Link className="d-flex justify-content-end" href="#" as="span">
							{user
								? <>
										<em className="d-flex align-items-center">
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

export default connect(
	mapStateToProps
)(NavigationBar)
