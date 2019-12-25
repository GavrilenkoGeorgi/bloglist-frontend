describe('Blog app ', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			email: 'hank@aol.com',
			username: 'Hank \'tester\' Hill',
			password: 'Propane1'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function() {
		cy.visit('http://localhost:3000')
		cy.contains('Blog app')
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.get('[data-cy="emailInput"]')
				.type('hank@aol.com')
			cy.get('[data-cy="passwordInput"]')
				.type('Propane1')
			cy.get('[data-cy=loginBtn]').click()
		})

		it('name of the user is shown', function() {
			cy.contains('Hank \'tester\' Hill logged in')
		})

		it('a blog can be added', function() {
			cy.get('[data-cy=addBlogFormToggle]').click()
			cy.get('[data-cy=newTitle')
				.type('Cypress test title')
			cy.get('[data-cy=newAuthor')
			.type('Test title')
			cy.get('[data-cy=newUrl')
			.type('url.com')
			cy.get('[data-cy=createBlogBtn').click()
			cy.visit('http://localhost:3000/blogs')
			cy.contains('Cypress test title')
		})

		it('a blog comment can be added', function() {
			cy.get('[data-cy="addBlogFormToggle"]').click()
		})

		it('user can logout', function() {
			cy.get('[data-cy="logoutBtn"]').click()
			cy.contains('Login into application')
		})

	})

})
