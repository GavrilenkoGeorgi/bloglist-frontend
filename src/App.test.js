import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
	test('if no user logged, blogs are not rendered', async () => {
		const component = render(
			<App />
		)
		component.rerender(<App />)
		await waitForElement(
			() => component.getByTestId('main')
		)

		const loginHeader = component.getByText('Login into application')
		const loginForm = component.getByTestId('login-form')
		// login header is present
		expect(loginHeader).toBeDefined()
		// login form is defined
		expect(loginForm).toBeDefined()
		// no blogs header rendered
		expect(component.container).not.toHaveTextContent('Blogs')
	})

	test('renders blogs if logged in', async () => {
		const user = {
			username: 'tester',
			token: '1231231214',
			name: 'Donald Tester'
		}
		localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

		const component = render(
			<App />
		)
		component.rerender(<App />)
		await waitForElement(
			() => component.getByTestId('main')
		)
		expect(component.container).toHaveTextContent('Blogs')
	})
})
