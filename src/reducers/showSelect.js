import {
  GET_RESULTS_AND_EPISODES, CLEAR_RESULTS_AND_EPISODES
} from '../actions/showSelect'

let initialState = {
  shows: {},
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_RESULTS_AND_EPISODES:
      return {shows: action.payload}
    case CLEAR_RESULTS_AND_EPISODES:
      return {shows: action.payload}
    default:
      return state;
  }
}
