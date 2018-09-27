import {
  GET_RESULTS
} from '../actions/showSelect'

let initialState = {
  shows: []
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_RESULTS:
      return {shows: action.payload}
    default:
      return state;
  }
}
