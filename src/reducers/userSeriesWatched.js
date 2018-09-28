import {
  GET_WATCHED, ADD_WATCHED, DELETE_WATCHED, CHANGE_FAVORITE
} from '../actions/userSeriesWatched'

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
    case ADD_WATCHED:
      return {userWatched: action.payload}
    case DELETE_WATCHED:
      return {userWatched: action.payload}
    case CHANGE_FAVORITE:
      return {userWatched: action.payload}
    default:
      return state;
  }
}
