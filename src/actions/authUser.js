// Redux Action Creator
// This function creates an action that is used to set the authenticated user in the Redux store.
// It takes the user's 'id' as a parameter and returns an action object with a 'type' of 'SET_AUTH_USER'
// and the provided 'id'. When dispatched, this action informs the Redux store about the authenticated user.


export const SET_AUTH_USER = 'SET_AUTH_USER';

export function setAuthUser(id) {
  return {
    type: SET_AUTH_USER,
    id
  };
}
