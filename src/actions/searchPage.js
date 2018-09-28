import {searchAll, searchOneWithEpisodes} from '../models/showSelect'
import {checkIfWatched} from './userWatchedInfo'
const moment = require('moment')
export const GET_RESULTS_AND_EPISODES = 'GET_RESULTS_AND_EPISODES'

export const searchShowsWithEpisodes = (title, userid) =>{
  return async (dispatch) => {
    let response = await searchOneWithEpisodes(title)
    const today = moment(new Date()).format('YYYY-MM-D')
    let showObjectWithEpisodes = {
      showInfo: response,
      episodes: response._embedded.episodes,
      airedEpisodes: response._embedded.episodes.filter(episode => today > episode.airdate)
    }
    dispatch({
      type: GET_RESULTS_AND_EPISODES,
      payload: showObjectWithEpisodes
    })

  }
}

export const getTvId = async (title) =>{
  const response = await searchOneWithEpisodes(title)
  return response.id
}
