import axios from 'axios'

export const getAll = async (userid) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/except`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    return response.data.data
  } catch(e){
    return false
  }
}

export const addFollow = async (userId, followingId) => {
  await axios(`${process.env.REACT_APP_API_URL}/api/users/${userId}/following/${followingId}`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    data: {
      user_id: userId,
      follow_id: followingId
    }
  })

  const users = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}/following/`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })

  return users.data.data
}
