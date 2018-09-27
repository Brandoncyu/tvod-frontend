import {searchAll} from '../models/showSelect'

export const SEARCH_SHOW = 'SEARCH_SHOW'
export const GET_RESULTS = 'GET_RESULTS'

export const searchAllShows = (title) => {
  return async (dispatch) =>{
    let response = searchAll(title)
    let showObject = await response
    dispatch({
      type: GET_RESULTS,
      payload: showObject
    })
  }
}
