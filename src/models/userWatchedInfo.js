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

export const addWatched = async (userid, tvId, name, image) =>{
  const response = await axios(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    data: {
      user_id: userid,
      tv_id: tvId,
      tv_name: name,
      image: image,
      watched: true,
      favorite: false
    }
  })
  const episodes = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return episodes.data.data
}

export const deleteWatched = async (userid, tvId) =>{
  const response = await axios(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}`, {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  const payload = {
    watched: false,
    favorite: false
  }
  return payload
}

export const changeFavorite = async (userid, tvId, favorite) =>{
  const response = await axios(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}`, {
    method: 'PATCH',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    data: {
      favorite
    }
  })
}
