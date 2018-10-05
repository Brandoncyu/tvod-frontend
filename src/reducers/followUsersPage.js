import {
  GET_USER_DATA, CLEAR_USER_DATA
} from '../actions/followUsersPage'

let initialState = {
  userData: false,
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {userData: action.payload}
    case CLEAR_USER_DATA:
      return {userData: action.payload}
    default:
      return state;
  }
}
