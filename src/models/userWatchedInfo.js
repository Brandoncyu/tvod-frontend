import axios from 'axios'

export const checkSeries = async (userid, tvId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    return response.data.data
  } catch(e){
    return false
  }
}
