import {searchAll} from '../models/showSelect'
export const GET_RESULTS = 'GET_RESULTS'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'

export const searchAllShows = (title) => {
  return async (dispatch) => {
    let showObject = await searchAll(title)
    dispatch({
      type: GET_RESULTS,
      payload: showObject
    })
  }
}

export const clearSearch = () =>{
  return async (dispatch) =>{
    dispatch({
      type: CLEAR_SEARCH
    })
  }
}
