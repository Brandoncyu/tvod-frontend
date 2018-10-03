import axios from 'axios'

export const getAll = async (userid) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/following`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    return response.data.data
  } catch(e){
    return false
  }
}
