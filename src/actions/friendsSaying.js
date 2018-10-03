import { getAll } from '../models/friendsSaying'
export const GET_FOLLOWERS = 'GET_FOLLOWERS'

export const getFollowers = (userid) => {
  return async (dispatch) => {
    let followersData = await getAll(userid)
    dispatch({
      type: GET_FOLLOWERS,
      payload: followersData
    })
  }
}
