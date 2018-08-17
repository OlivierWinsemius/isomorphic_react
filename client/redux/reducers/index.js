import { combineReducers } from 'redux';
import exampleReducer from 'redux/reducers/exampleReducer';

export default combineReducers({
    example: exampleReducer,
});
