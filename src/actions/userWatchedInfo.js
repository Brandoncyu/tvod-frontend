import {checkSeries} from '../models/userWatchedInfo'
export const GET_WATCHED = 'GET_WATCHED'

export const checkIfWatched = (userid, tvId) =>{
  return async (dispatch) => {
    let response = await checkSeries(userid, tvId)

    if (!response) {
      response = { watched: false, favorite: false }
    }

    dispatch({
      type: GET_WATCHED,
      payload: response
    })
  }
}
