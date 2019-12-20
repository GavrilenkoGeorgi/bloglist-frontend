import axios from 'axios'
const baseUrl = '/api/users'

const getUsersList = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const signUp = async (credentials) => {
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

export default { getUsersList, signUp }
