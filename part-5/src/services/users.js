import axios from 'axios'
const baseUrl = '/api/auth'

const create = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default { create }
