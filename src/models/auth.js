import axios from 'axios'

const verify = async () => {
  let token = localStorage.getItem('token')

  if (!token) return false
  try {
    const response = await axios(`${process.env.REACT_APP_API_URL}/api/users/token`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (e){
    return false
  }
}

export default {verify}
