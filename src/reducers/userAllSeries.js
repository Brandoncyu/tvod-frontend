import {
  GET_ALL_SERIES, CLEAR_ALL_SERIES
} from '../actions/userAllSeries'

let initialState = {
  allSeries: false
};

export default(state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SERIES:
      return {allSeries: action.payload}
    case CLEAR_ALL_SERIES:
      return {allSeries: action.payload}
    default:
      return state;
  }
}
