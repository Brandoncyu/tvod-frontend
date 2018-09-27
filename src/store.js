import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/auth.reducers'
import searchReducer from './reducers/showSelect'

export default(initialState) => {
  const reducer = combineReducers({auth: authReducer, search: searchReducer})
    return createStore(
      reducer,
      applyMiddleware(logger, thunkMiddleware)
    );
}
