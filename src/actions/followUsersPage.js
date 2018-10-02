import { getUser } from '../models/followUsersPage'
export const GET_USER_DATA = 'GET_USER_DATA'

export const getUserData = (username, userid) =>{
  return async (dispatch) => {
    let userData = await getUser(username, userid)
    dispatch({
      type: GET_USER_DATA,
      payload: userData
    })
  }
}
