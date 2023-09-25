import { getInitialData } from '../utils/api';      // Import a function to fetch initial data
import { receiveQuestions } from '../actions/questions'; // Import an action for receiving questions
import { receiveUsers } from '../actions/users';       // Import an action for receiving users

// Define a function to handle the initial data retrieval and dispatch actions
export function handleInitialData() {
  return async dispatch => {
    // Use the getInitialData function to fetch data, which returns a promise
    const { users, questions } = await getInitialData();
    // Dispatch an action to receive and store the fetched questions
    dispatch(receiveQuestions(questions));
    // Dispatch an action to receive and store the fetched users
    dispatch(receiveUsers(users));
  };
}
