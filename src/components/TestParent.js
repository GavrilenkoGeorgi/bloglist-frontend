import React, { useState } from 'react'
import Basic from './Basic'
import Counter from './Counter'
import TestHook from '../hooks/TestHook'

const TestParent = () => {
	const [state, setState] = useState('Some Text')
	const [name, setName] = useState('Moe')

	const changeName = () => {
		setName('Steve')
	}

	return (
		<>
			<div className="App">
				<Basic />
			</div>
			<h1> Counter </h1>
			<Counter />
			<h1> Basic Hook useState </h1>
			<TestHook name={name} changeName={changeName}/>
		</>
	)
}

export default TestParent