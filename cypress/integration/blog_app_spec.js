describe('Blog app ', function() {
	beforeEach(function() {
		cy.request('POST', '/api/testing/reset')
		cy.createUser()
	})

	it('logs in programmatically without using the UI', function () {
		cy.request('POST', '/api/login', {
			email: Cypress.env('email'),
			password: Cypress.env('password')
		})
		.its('status')
		.should('equal', 200)
	})

	it('logs in with a custom command', function () {
		cy.login().its('status').should('equal', 200)
	})

	it('fails to access protected resource', () => {
		cy.request({
			url: 'http://localhost:3003/api/users', // This?
			failOnStatusCode: false,
		})
		.its('status')
		.should('equal', 401)
	})

	describe('when logged in', function() {
		beforeEach(() => {
			cy.login()
			cy.visit('/')
		})

		it('name of the user is shown', function() {
			cy.contains('Hank tester Hill logged in')
		})

		it('blog can be added and liked', function() {
			cy.get('[data-cy=addBlogFormToggle]').click()
			cy.get('[data-cy=newTitle]')
				.type('Cypress test title')
			cy.get('[data-cy=newAuthor]')
				.type('Test title')
			cy.get('[data-cy=newUrl]')
				.type('url.com')
			cy.get('[data-cy=createBlogBtn').click().wait(1000)
			cy.visit('/blogs')
			cy.contains('Cypress test title')
			cy.get('[data-cy=likeBtn]').click().wait(1000)
			cy.contains('1 likes')
		})

		it('blog comment can be added', function() {
			// add new blog
			cy.get('[data-cy=addBlogFormToggle]').click()
			cy.get('[data-cy=newTitle]')
				.type('Cypress add comment test')
			cy.get('[data-cy=newAuthor]')
				.type('Cypress')
			cy.get('[data-cy=newUrl]')
				.type('test.com')
			cy.get('[data-cy=createBlogBtn]').click().wait(2000)
			cy.visit('/blogs')
			cy.get('[data-cy=blogTitleLink]').click()
			cy.get('[data-cy=commentInput]')
				.type('Cypress test comment')
			cy.get('[data-cy=commentBtn]').click()
			cy.contains('Cypress test comment')
		})

		it('users list can be viewed', function() {
			cy.visit('/users')
			cy.contains('Users')
			cy.contains('Hank tester Hill')
		})

		it('user can logout', function() {
			cy.get('[data-cy=logoutBtn]').click()
			cy.location('pathname').should('equal', '/')
		})
	})
})
