import { combineReducers } from 'redux';
import books from './bookReducer';
import users from './userReducer';

const rootReducer = combineReducers({
  books,
  users
});

export default rootReducer;