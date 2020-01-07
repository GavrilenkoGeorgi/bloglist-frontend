import React from 'react'
// import ReactDOM from 'react-dom'
import BlogAddForm from '../components/BlogAddForm'
import { Provider } from 'react-redux'
import { render, fireEvent, cleanup } from '@testing-library/react'
import store from '../store'
import App from '../App'
import Notification from '../components/Notification'

// import Context from '../../store/context'

afterEach(cleanup)

it('Submiting add blog form works correctly', () => {
	store.user = {
		token: "ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhbmtAYW9sLmNvbSIsImlkIjoiNWRmY2RhNGU0M2IzYmQxZTRjMzllZDA2IiwiaWF0IjoxNTc4MjM2MjgwfQ.LpHQr-0vkvKHaC-sbJ99SZx2v8aeE3YlnSfqnOl9IVQ",
		username: "Dale 'tester' Gribble",
		email: "dale@aol.com",
		id: "5dfcda4e43b3bd1e4c39ed07"
	}
	window.localStorage.setItem(
		'loggedUserJSON', JSON.stringify(store.user)
	)
	const { getByTestId, getByText, debug } = render(
		<Provider store={store}>
			<App>
				<Notification />
				<BlogAddForm />
			</App>
		</Provider>
	)

	expect(getByText(/Title/i).textContent).toBe('Title')

	// accessing form data from the synthetic event when
	// user submits a form
	// with text1 being the id of our input element
	// and using data-testid property of the form to address it
	fireEvent.submit(getByTestId('addBlogForm'), { target: { title: { value: 'Test title' } } })

	// debug()
	// expect(getByText(/Title/i).textContent).not.toBe('')
	})
