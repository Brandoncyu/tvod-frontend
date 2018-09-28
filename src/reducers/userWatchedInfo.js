import {
  GET_WATCHED
} from '../actions/userWatchedInfo'

let initialState = {
  userWatched: {
    watched: false,
    favorite: false,
  },
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_WATCHED:
      return {userWatched: action.payload}
    default:
      return state;
  }
}
