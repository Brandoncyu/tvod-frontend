import axios from 'axios'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {searchOneByNumber} from './showSelect'
const moment = extendMoment(Moment);

export const getAll = async (userid) =>{
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/series`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })

  const promiseData = response.data.data.map(async element => {
    let tvId = element['tv_id']
    let episodes = await searchOneByNumber(tvId)
    element.episode_count = episodes.length
    episodes.forEach(async episode => {
      if (thisWeeksDates(episode.airstamp)) element.episode_upcoming = episode
      if (lastWeeksDates(episode.airstamp)) {
        const response = await checkIfWatched(userid, episode.id)
        response.length > 0 ? episode.watched = true : episode.watched = false

        element.episode_last = episode
      }
    })
    return element
  })
  const data = await Promise.all(promiseData)
  return data
}

function thisWeeksDates(day){
  let newDay = Moment(day)
  const today = new Date(Date.now())
  const nextWeek = new Date(Date.now())
  nextWeek.setDate(nextWeek.getDate() + 6);
  const range = moment.range(today, nextWeek)
  return range.contains(newDay)
}

function lastWeeksDates(day){
  let newDay = Moment(day)
  const lastWeek = new Date(Date.now())
  lastWeek.setDate(lastWeek.getDate() - 7)

  const yesterday = new Date(Date.now())


  const range = moment.range(lastWeek, yesterday)
  return range.contains(newDay)
}

async function checkIfWatched(userid, episodeId){
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userid}/episodes/${episodeId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data.data
}
