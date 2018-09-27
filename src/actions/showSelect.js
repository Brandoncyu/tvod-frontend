import {searchAll, searchOneWithEpisodes} from '../models/showSelect'
const moment = require('moment')
export const GET_RESULTS = 'GET_RESULTS'
export const GET_RESULTS_AND_EPISODES = 'GET_RESULTS_AND_EPISODES'

export const searchAllShows = (title) => {
  return async (dispatch) => {
    let showObject = await searchAll(title)
    dispatch({
      type: GET_RESULTS,
      payload: showObject
    })
  }
}

export const searchShowsWithEpisodes = (title, userid) =>{
  return async (dispatch) => {
    let response = await searchOneWithEpisodes(title)
    const today = moment(new Date()).format('YYYY-MM-D')
    let showObjectWithEpisodes = {
      showInfo: response,
      episodes: response._embedded.episodes,
      airedEpisodes: response._embedded.episodes.filter(episode => today > episode.airdate),
      user_id: userid,
      tv_id: response.id,
      tv_name: response.name,
      watched: false,
      favorite: false,
    }
    dispatch({
      type: GET_RESULTS_AND_EPISODES,
      payload: showObjectWithEpisodes
    })
  }
}
