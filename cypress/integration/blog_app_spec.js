describe('Blog app ', function() {
	beforeEach(function() {
		cy.request('POST', '/api/testing/reset')
		const user = {
			email: 'hank@aol.com',
			username: 'Hank \'tester\' Hill',
			password: 'Propane1'
		}
		cy.request('POST', '/api/users/', user)
		cy.visit('/')
	})

	it('front page can be opened', function() {
		cy.visit('/')
		cy.contains('Blog app')
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.get('[data-cy=emailInput]')
				.type('hank@aol.com')
			cy.get('[data-cy=passwordInput]')
				.type('Propane1')
			cy.get('[data-cy=loginBtn]').click().wait(250)
		})

		it('name of the user is shown', function() {
			cy.contains('Hank \'tester\' Hill logged in')
		})

		it('blog can be added and liked', function() {
			cy.get('[data-cy=addBlogFormToggle]').click()
			cy.get('[data-cy=newTitle]')
				.type('Cypress test title')
			cy.get('[data-cy=newAuthor]')
				.type('Test title')
			cy.get('[data-cy=newUrl]')
				.type('url.com')
			cy.get('[data-cy=createBlogBtn').click().wait(2000)
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
			cy.contains('Hank \'tester\' Hill')
		})

		it('user can logout', function() {
			cy.get('[data-cy=logoutBtn]').click()
			cy.contains('Login into application')
		})
	})
})
