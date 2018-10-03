import axios from 'axios'
import {searchOneByNumber} from './showSelect'

export const getUser = async (username, userid) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/username/${username}/`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    let data = response.data.data
    const promiseData = data.series.map(async element => {
      const episodes = await searchOneByNumber(element['tv_id'])
      element.episode_count = episodes.length
      return element})
    data.series = await Promise.all(promiseData)

    return data
  } catch(e){
    return false
  }
}
