import {checkSeries, addWatched, deleteWatched, changeFavorite} from '../models/userSeriesWatched'
export const GET_WATCHED = 'GET_WATCHED'
export const CLEAR_WATCHED = 'CLEAR_WATCHED'
export const ADD_WATCHED = 'ADD_WATCHED'
export const DELETE_WATCHED = 'DELETE_WATCHED'
export const CHANGE_FAVORITE = 'CHANGE_FAVORITE'

export const checkIfWatched = (userid, tvId) => {
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

export const clearIfWatched = () => {
  return (dispatch) => {
    let response = {
      watched: false,
      favorite: false,
    }

    dispatch({
      type: CLEAR_WATCHED,
      payload: response
    })
  }
}

export const addWatchedShow = (userId, tvId, name, image) => {
  return async (dispatch) =>{
    let response = await addWatched(userId, tvId, name, image)

    dispatch({
      type: ADD_WATCHED,
      payload: response
    })
  }
}

export const deleteWatchedShow = (userId, tvId) =>{
  return async(dispatch) => {
    let response = await deleteWatched(userId, tvId)

    dispatch({
      type: DELETE_WATCHED,
      payload: response
    })
  }
}

export const changeFavoriteShow = (userid, tvId, favorite) => {
  return async(dispatch) => {
    let response = await changeFavorite(userid, tvId, favorite)

    dispatch({
      type: CHANGE_FAVORITE,
      payload: response
    })
  }
}
