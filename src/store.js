import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/auth.reducers'
import searchReducer from './reducers/showSelect'
import showReducer from './reducers/searchPage'
import watchedReducer from './reducers/userSeriesWatched'
import episodeReducer from './reducers/userEpisodesWatched'
import allSeriesReducer from './reducers/userAllSeries'

export default(initialState) => {
  const reducer = combineReducers({auth: authReducer, search: searchReducer, showInfo: showReducer, watchedInfo: watchedReducer, episodeInfo: episodeReducer, allSeries: allSeriesReducer })
    return createStore(
      reducer,
      applyMiddleware(thunkMiddleware, logger)
    );
}
