import {
  GET_EPISODES, ADD_EPISODE, ADD_COMMENT, ADD_RATING
} from '../actions/userEpisodesWatched'

let initialState = {
  episodesWatched: []
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_EPISODES:
      return {episodesWatched: action.payload}
    case ADD_COMMENT:
      return {episodesWatched: action.payload}
    case ADD_RATING:
      return {episodesWatched: action.payload}
    case ADD_EPISODE:{
      return {episodesWatched: action.payload}
    }
    default:
      return state;
  }
}
