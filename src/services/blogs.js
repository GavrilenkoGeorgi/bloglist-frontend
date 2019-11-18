import axios from 'axios'
const baseUrl = '/api/blogs'

// this is the token!
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(`Token is: ${token}`)
}

const removeToken = () => console.log('Removing from localStorage')

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, setToken, removeToken, create }