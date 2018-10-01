import {
  GET_RESULTS, CLEAR_SEARCH
} from '../actions/showSelect'

let initialState = {
  shows: [],
};

export default(state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SEARCH:
      return {shows: []}
    case GET_RESULTS:
      return {shows: action.payload}
    default:
      return state;
  }
}
