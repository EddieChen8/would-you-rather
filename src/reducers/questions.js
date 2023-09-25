import {
  RECEIVE_QUESTIONS,
  ADD_ANSWER_TO_QUESTION,
  ADD_QUESTION
} from '../actions/questions';

// Define the questions reducer function
const questions = (state = {}, action) => {
  switch (action.type) {
    // Case for receiving a batch of questions
    case RECEIVE_QUESTIONS:
      // Merge the incoming questions with the current state
      return {
        ...state,
        ...action.questions
      };

    // Case for adding an answer to a question
    case ADD_ANSWER_TO_QUESTION:
      // Extract data from the action
      const { authUser, qid, answer } = action;

      // Update the question's answer data with the new vote
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            // Add the authenticated user to the list of votes
            votes: [...state[qid][answer].votes, authUser]
          }
        }
      };

    // Case for adding a new question
    case ADD_QUESTION:
      // Extract the new question from the action
      const { question } = action;

      // Add the new question to the state
      return {
        ...state,
        [question.id]: question
      };

    // Default case: return the current state if the action is not recognized
    default:
      return state;
  }
};

// Export the questions reducer function
export default questions;
