import {
  GET_ALL_USERS, CLEAR_ALL_USERS
} from '../actions/followUsers'

let initialState = {
  users: false,
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {users: action.payload}
    case CLEAR_ALL_USERS:
      return {users: action.payload}
    default:
      return state;
  }
}
