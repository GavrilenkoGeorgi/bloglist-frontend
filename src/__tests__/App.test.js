import React from 'react'
import { Provider } from 'react-redux'
import { render, waitForElement, fireEvent, cleanup } from '@testing-library/react'
import App from '../App'
import store from '../store'

afterEach(cleanup)

describe('Blog list app', () => {
	it('it renders home page correctly', async () => {
		const component = render(
			<Provider store={store}>
				<App />
			</Provider>
		)
		expect(component.container).toHaveTextContent(
			'Login or sign up to add something'
		)
		/* what's this?
		component.rerender(
			<Provider store={store}>
				<App />
			</Provider>
		)*/
		/*
		await waitForElement(
			() => component.getByRole('main')
		) */
	})

	it('if user is logged in, \'new blog\' button is displayed', () => {
		// variables?
		store.user = {
			token: "ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhbmtAYW9sLmNvbSIsImlkIjoiNWRmY2RhNGU0M2IzYmQxZTRjMzllZDA2IiwiaWF0IjoxNTc4MjM2MjgwfQ.LpHQr-0vkvKHaC-sbJ99SZx2v8aeE3YlnSfqnOl9IVQ",
			username: "Dale 'tester' Gribble",
			email: "dale@aol.com",
			id: "5dfcda4e43b3bd1e4c39ed07"
		}
		window.localStorage.setItem(
			'loggedUserJSON', JSON.stringify(store.user)
		)

		const { container, getByText } = render(
			<Provider store={store}>
				<App />
			</Provider>
		)
		expect(getByText(/new/i).textContent).toBe('new blog')

		fireEvent.click(getByText('new blog'))

		expect(container).toHaveTextContent(
			'Blog add form'
		)
	})
})
