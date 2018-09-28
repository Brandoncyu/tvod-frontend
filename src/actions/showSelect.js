import {searchAll, searchOneWithEpisodes} from '../models/showSelect'
const moment = require('moment')
export const GET_RESULTS = 'GET_RESULTS'

export const searchAllShows = (title) => {
  return async (dispatch) => {
    let showObject = await searchAll(title)
    dispatch({
      type: GET_RESULTS,
      payload: showObject
    })
  }
}
