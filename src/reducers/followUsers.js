import {
  GET_ALL_USERS
} from '../actions/followUsers'

let initialState = {
  users: [],
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {users: action.payload}
    default:
      return state;
  }
}
