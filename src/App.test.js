import React from 'react'
import { Provider } from 'react-redux'
import { render, waitForElement, cleanup } from '@testing-library/react'
import App from './App'
import store from './store'

afterEach(cleanup)

describe('Blog list app', () => {
	test.only('it renders main div correctly', async () => {
		const component = render(
			<Provider store={store}>
				<App />
			</Provider>
		)
		component.rerender(
			<Provider store={store}>
				<App />
			</Provider>
		)
		await waitForElement(
			() => component.getByRole('main')
		)
	})
})
