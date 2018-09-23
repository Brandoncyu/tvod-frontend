import auth from './auth.reducers';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
    auth,
    form: formReducer
});
export default rootReducer;
