
const notificationReducer = (state = '', action) => {
	switch (action.type) {
	case 'SET_NOTIFICATION':
		state = action.data
		return state
	case 'RESET':
		return action.data
	default:
		return state
	}
}

export const setNotification = (message, time) => {
	return dispatch => {
		dispatch ({
			type: 'SET_NOTIFICATION',
			data: message
		})
		setTimeout(() => {
			dispatch ({
				type: 'SET_NOTIFICATION',
				data: null
			})
		}, time * 1000)
	}
}

export default notificationReducer
