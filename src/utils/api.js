import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA';

// Function to fetch initial data (users and questions) from _DATA.js
export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}

// Function to save a new question
export function saveQuestion(question) {
  return _saveQuestion(question);
}

// Function to save a user's answer to a question
export function saveQuestionAnswer(authUser, qid, answer) {
  return _saveQuestionAnswer({ authUser, qid, answer });
}

