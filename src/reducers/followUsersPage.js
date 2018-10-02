import {
  GET_USER_DATA
} from '../actions/followUsersPage'

let initialState = {
  userData: {},
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {userData: action.payload}
    default:
      return state;
  }
}
