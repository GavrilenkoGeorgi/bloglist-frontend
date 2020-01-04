import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
const blog = {
	title: 'Component testing',
	author: 'Hank Hill',
	url: 'some.url',
	likes: 1,
	user: {
		id: '5dce9d7559d0641eb47ffb3a'
	}
}
const currentUserName = 'Hank Hill'
const mockHandler = jest.fn()

beforeEach(() => {
	component = render(
		<Blog
			blog={blog}
			handleUpdate={mockHandler}
			handleDelete={mockHandler}
			currentUserName={currentUserName}
		/>
	)
})

test('renders content and only title and author is visible', () => {
	// render
	expect(component.container).toHaveTextContent(
		'Component testing'
	)

	// only title and author, rest is hidden
	const element = component.getByText(
		'Component testing Hank Hill'
	)
	expect(element).toBeDefined()

	const div = component.container.querySelector('.more-info')
	expect(div).toHaveStyle('display: none')
})

test('after clicking the title div, more info is displayed', () => {
	const div = component.container.querySelector('.more-info')
	fireEvent.click(div)

	expect(div).not.toHaveStyle('display: none')
})
