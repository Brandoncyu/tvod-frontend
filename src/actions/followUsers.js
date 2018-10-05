import {getAll } from '../models/followUsers'
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const CLEAR_ALL_USERS = 'CLEAR_ALL_USERS'

export const getAllUsers = (userid) => {
  return async (dispatch) => {
    let allUsers = await getAll(userid)
    dispatch({
      type: GET_ALL_USERS,
      payload: allUsers
    })
  }
}

export const clearAllUsers = () =>{
  return async (dispatch) =>{
    let allUsers = []
    dispatch({
      type: CLEAR_ALL_USERS,
      payload: allUsers
    })
  }
}
