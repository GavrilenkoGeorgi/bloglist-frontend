import axios from 'axios'
const baseUrl = '/api/users'

const getUsersList = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

export default { getUsersList }
