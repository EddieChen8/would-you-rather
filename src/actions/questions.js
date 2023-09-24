import { saveQuestion } from '../utils/api';  // Import a function for saving a new question to the backend API.
import { addQuestionToUser } from '../actions/users';  // Import an action creator for adding a question to a user's list of questions.

// Define action types
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';  // Action type for receiving a list of questions.
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';  // Action type for adding an answer to a question.
export const ADD_QUESTION = 'ADD_QUESTION';  // Action type for adding a new question.

// Action creator to receive a list of questions
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

// Action creator to add an answer to a question
export function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer
  };
}

// Helper function to create an action for adding a new question
function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

// Action creator to handle the process of saving a new question
export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return async dispatch => {
    // Call the saveQuestion function from the API, passing the question details and author.
    const question_1 = await saveQuestion({ optionOneText, optionTwoText, author });
    // Dispatch an action to add the new question to the store.
    dispatch(addQuestion(question_1));
    // Dispatch an action to add the question to the user's list of questions.
    dispatch(addQuestionToUser(question_1));
  };
}
