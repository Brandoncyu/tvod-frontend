import { applyMiddleware, createStore, combineReducers } from 'redux';
import rootReducer from  './reducers';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import authReducer from './reducers/auth.reducers'

export default(initialState) => {
  const reducer = combineReducers({auth: authReducer})
    return createStore(
      reducer,
      applyMiddleware(logger, thunkMiddleware)
    );
}
