import {
  SEARCH_SHOW
} from '../actions/showSelect'

let initialState = {
  shows: []
};

export default(state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SHOW:
      return {shows: action.payload}
    default:
      return state;
  }
}
