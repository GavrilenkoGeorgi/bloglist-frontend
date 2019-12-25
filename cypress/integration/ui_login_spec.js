/// <reference types="cypress" />

it('logs in using UI', () => {
	cy.visit('/')
	cy.location('pathname').should('equal', '/login')

	// enter valid username and password
	cy.get('[data-cy=emailInput]').type(Cypress.env('email'))
	cy.get('[data-cy=passwordInput]').type(Cypress.env('password'))
	cy.get('[data-cy=loginBtn]').click().wait(250)

	// confirm we have logged in successfully
	cy.location('pathname').should('equal', '/')
	cy.contains('Blog app')
	.should('be.visible')
	.then(() => {
		/* global window */
		const userString = window.localStorage.getItem('loggedUserJSON')
		expect(userString).to.be.a('string')
		const user = JSON.parse(userString)
		expect(user).to.be.an('object')
		expect(user).to.have.keys([
			'token',
			'username',
			'email',
			'id'
		])
		expect(user.token).to.be.a('string')
	})

	// logout
	cy.get('[data-cy=logoutBtn]').click()
	cy.location('pathname').should('equal', '/login')
	cy.location('pathname').should('equal', '/')
})

it('fails to access protected resource', () => {
	cy.request({
		url: 'http://localhost:3000/users',
		failOnStatusCode: false,
	})
	.its('status')
	.should('equal', 401)
})

it('does not log in with invalid password', () => {
	cy.visit('/')
	cy.location('pathname').should('equal', '/login')

	// valid emal and invalid pass
	cy.get('[data-cy=emailInput]').type(Cypress.env('email'))
	cy.get('[data-cy=passwordInput]').type('WrongPass')
	cy.get('[data-cy=loginBtn]').click().wait(250)

	// still on /login page plus an error is displayed
	cy.location('pathname').should('equal', '/login')

	cy.contains('.alert-danger', 'Username or password is incorrect').should(
		'be.visible'
	)
})
