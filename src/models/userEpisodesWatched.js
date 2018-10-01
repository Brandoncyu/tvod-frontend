import axios from 'axios'

export const getEpisodes = async (userid, tvId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}/episodes`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    return response.data.data
  } catch(e){
    return false
  }
}

export const addEpisodeToDatabase = async (userid, tvId, tvName, image, epId, seasonNo, epNo, epName)=>{
  await axios(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}/episodes`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    data: {
      user_id: userid,
      tv_id: tvId,
      tv_name: tvName,
      image: image,
      ep_id: epId,
      season_no: seasonNo,
      ep_no: epNo,
      ep_name: epName,
      watched: true
    }
  })
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}/episodes`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data.data
}

export const addMultipleEpisodeToDatabase = async (userid, tvId, episodes)=>{
  await axios(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}/episodes/multiple`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    data: {
      episodes
    }
  })
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}/episodes`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data.data
}

export const addCommentToDatabase = async (userid, tvId, epId, comments)=>{
  await axios(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}/episodes/${epId}`, {
    method: 'PATCH',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    data: {
      comments: comments
    }
  })
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}/episodes`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data.data
}

export const addRatingToDatabase = async (userid, tvId, epId, rating)=>{
  await axios(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}/episodes/${epId}`, {
    method: 'PATCH',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    data: {
      rating: rating
    }
  })
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series/${tvId}/episodes`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data.data
}
