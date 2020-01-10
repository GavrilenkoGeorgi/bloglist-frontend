import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render, fireEvent, cleanup, waitForElement } from '@testing-library/react'
import Blog from '../components/Blog'
import App from '../App'
import store from '../store'
import blog from '../__mocks__/singleTestBlog'
import user from '../__mocks__/testUser'

afterEach(cleanup)

describe('Single blog component', () => {
	it('renders without errors', () => {
		const { container } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Blog blog={blog}/>
				</MemoryRouter>
			</Provider>
		)
		expect(container).toHaveTextContent('Single test blog title')
	})

	it('shows delete button if user is logged in and is the author', async () => {
		window.localStorage.setItem(
			'loggedUserJSON', JSON.stringify(user)
		)
		store.user = user
		const { container } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Blog
						blog={blog}
						userId={user.id}
					/>
				</MemoryRouter>
			</Provider>
		)
		await waitForElement(
			() => container
		)
		expect(container).toHaveTextContent('delete')
	})

	it('hides delete button otherwise', async () => {
		user.id = '_wrong_test_id_4e43b3bd1'
		window.localStorage.setItem(
			'loggedUserJSON', JSON.stringify(user)
		)
		store.user = user
		const { container } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Blog
						blog={blog}
						userId={user.id}
					/>
				</MemoryRouter>
			</Provider>
		)
		await waitForElement(
			() => container
		)
		expect(container).not.toHaveTextContent('delete')
	})
})
