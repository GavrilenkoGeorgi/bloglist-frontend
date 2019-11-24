import axios from 'axios'
const baseUrl = '/api/blogs'

// this is the token!
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  // console.log(`Token is: ${token}`)
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

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request
}

export default { getAll, setToken, removeToken, create, update, deleteBlog }
