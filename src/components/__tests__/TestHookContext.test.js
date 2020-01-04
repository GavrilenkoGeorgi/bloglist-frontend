import React from 'react'
import ReactDOM from 'react-dom'
import TestHookContext from '../TestHookContext'
import { act, render, fireEvent, cleanup } from '@testing-library/react'
import TestParent from '../TestParent'

import Context from '../../store/context'

afterEach(cleanup)

it('Context value is updated by child component', () => {

	const { container, getByText } = render(
		<TestParent>
			<Context.Provider>
				<TestHookContext />
			</Context.Provider>
		</TestParent>
	)

	expect(getByText(/Some/i).textContent).toBe("Some Text")

	fireEvent.click(getByText("Change Text"))

	expect(getByText(/Some/i).textContent).toBe("Some Other Text")
})
