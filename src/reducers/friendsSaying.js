import {
  GET_FOLLOWERS
} from '../actions/friendsSaying'

let initialState = {
  users: [],
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS:
      return {users: action.payload}
    default:
      return state;
  }
}
