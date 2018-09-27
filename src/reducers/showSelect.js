import {
  GET_RESULTS,
  GET_RESULTS_AND_EPISODES
} from '../actions/showSelect'

let initialState = {
  shows: []
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_RESULTS:
      return {shows: action.payload}
    case GET_RESULTS_AND_EPISODES:
      return {shows: action.payload}
    default:
      return state;
  }
}
