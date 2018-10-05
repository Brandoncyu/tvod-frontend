import {getAll} from '../models/userAllSeries'
export const GET_ALL_SERIES = 'GET_ALL_SERIES'
export const CLEAR_ALL_SERIES = 'CLEAR_ALL_SERIES'

export const getAllSeries = (userid) => {
  return async (dispatch) => {
    let showObject = await getAll(userid)
    dispatch({
      type: GET_ALL_SERIES,
      payload: showObject
    })
  }
}

export const clearAllSeries = () => {
  return (dispatch) => {
    let showObject = []
    dispatch({
      type: GET_ALL_SERIES,
      payload: showObject
    })
  }
}
