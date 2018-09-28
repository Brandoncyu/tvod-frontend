import {
  GET_RESULTS_AND_EPISODES
} from '../actions/searchPage'

let initialState = {
  shows: {},
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_RESULTS_AND_EPISODES:
      return {shows: action.payload}
    default:
      return state;
  }
}
