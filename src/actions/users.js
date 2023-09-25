// Import the necessary functions and actions
import { saveQuestionAnswer } from '../utils/api';      // Import a function to save a user's answer to a question
import { addAnswerToQuestion } from '../actions/questions'; // Import an action to add an answer to a question

// Define action types as constants
export const RECEIVE_USERS = 'RECEIVE_USERS'; // Action type for receiving users
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER'; // Action type for adding an answer to a user
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'; // Action type for adding a question to a user

// Action creator to receive and store users in the Redux store
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

// Action creator to add an answer to a user
function addAnswerToUser(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authUser,
    qid,
    answer
  };
}

// Action creator to handle saving a user's answer to a question
export function handleSaveQuestionAnswer(authUser, qid, answer) {
  return async dispatch => {
    // Dispatch an action to add the answer to the user
    dispatch(addAnswerToUser(authUser, qid, answer));
    
    // Dispatch an action to add the answer to the question
    dispatch(addAnswerToQuestion(authUser, qid, answer));

    try {
      // Call the API function to save the question answer
      return await saveQuestionAnswer(authUser, qid, answer);
    } catch (e) {
      console.warn('Error in handleSaveQuestionAnswer:', e);
    }
  };
}

// Action creator to add a question to a user
export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author
  };
}
