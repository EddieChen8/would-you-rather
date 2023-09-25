// Import action types
import {
  RECEIVE_USERS,
  ADD_ANSWER_TO_USER,
  ADD_QUESTION_TO_USER
} from '../actions/users';

// Define the users reducer function
export default function users(state = {}, action) {
  switch (action.type) {
    // Case for receiving a batch of users
    case RECEIVE_USERS:
      // Merge the incoming users into the current state
      return {
        ...state,
        ...action.users
      };

    // Case for adding an answer to a user's profile
    case ADD_ANSWER_TO_USER:
      // Extract data from the action
      const { authUser, qid, answer } = action;

      // Update the user's answers with the new answer to a question
      return {
        ...state,
        [authUser]: {
          ...state[authUser],
          answers: {
            ...state[authUser].answers,
            [qid]: answer
          }
        }
      };

    // Case for adding a new question to a user's profile
    case ADD_QUESTION_TO_USER:
      // Extract data from the action
      const { id, author } = action;

      // Add the new question's ID to the user's list of questions
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id)
        }
      };

    // Default case: return the current state if the action is not recognized
    default:
      return state;
  }
}
