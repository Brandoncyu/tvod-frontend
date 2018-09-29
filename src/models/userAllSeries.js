import axios from 'axios'
import {searchOneByNumber} from './showSelect'

export const getAll = async (userid) =>{
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  const promiseData = response.data.data.map(async element => {
    element.episode_count = await searchOneByNumber(element['tv_id'])
    return element})
  const data = await Promise.all(promiseData)
  return data
}
