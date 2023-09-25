import { combineReducers } from 'redux';
// Import individual reducers for different parts of the application state
import authUser from '../reducers/authUser';
import questions from '../reducers/questions';
import users from '../reducers/users';

// Combine all the reducers into a single rootReducer
const rootReducer = combineReducers({
  // The 'authUser' reducer manages the authenticated user in the state
  authUser,
  // The 'questions' reducer manages the application's questions data
  questions,
  // The 'users' reducer manages the application's users data
  users
});

// Export the rootReducer, which combines and manages all state slices
export default rootReducer;

