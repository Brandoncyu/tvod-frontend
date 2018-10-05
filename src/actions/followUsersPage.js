import { getUser } from '../models/followUsersPage'
export const GET_USER_DATA = 'GET_USER_DATA'
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA'

export const getUserData = (username, userid) =>{
  return async (dispatch) => {
    let userData = await getUser(username, userid)
    dispatch({
      type: GET_USER_DATA,
      payload: userData
    })
  }
}

export const clearUserData = () =>{
  return (dispatch) => {
    let userData = {}
    dispatch({
      type: CLEAR_USER_DATA,
      payload: userData
    })
  }
}
