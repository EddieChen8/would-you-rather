// Reducer for managing the authenticated user in the Redux store
import { SET_AUTH_USER } from '../actions/authUser';

// The initial state is set to null, indicating no authenticated user by default
export default function authUser(state = null, action) {
  // Check if the action type is SET_AUTH_USER, which is used to set the authenticated user
  if (action.type === SET_AUTH_USER) {
    // If SET_AUTH_USER action is dispatched, return the user ID from the action
    // This updates the authenticated user in the store
    return action.id;
  }

  // If the action type is not SET_AUTH_USER or no action is dispatched, return the current state
  // This ensures that the state remains unchanged for other actions
  return state;
}
