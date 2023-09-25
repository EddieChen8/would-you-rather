import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Button, Form, Radio } from 'semantic-ui-react';
import { handleSaveQuestionAnswer } from '../actions/users';

// Define the PollQuestion component
const PollQuestion = ({ question }) => {
  // Access the authenticated user from the Redux store using useSelector
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch(); // Get the dispatch function from React Redux

  // State to track the selected answer option
  const [value, setValue] = useState('');

  // Handle changes when a radio option is selected
  const handleChange = (e, { value }) => setValue(value);

  // Handle form submission when the user answers the question
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if a valid option is selected before dispatching the action
    if (value !== '') {
      // Dispatch an action to save the user's answer for the question
      dispatch(handleSaveQuestionAnswer(authUser, question.id, value));
    }
  };

  // Disable the submit button if no option is selected
  const disabled = value === '' ? true : false;

  return (
    <>
      {/* Display the question header */}
      <Header as="h4">Would you rather</Header>
      {/* Create a form for answering the question */}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          {/* Radio buttons for the two answer options */}
          <Radio
            label={question.optionOne.text}
            name="radioGroup"
            value="optionOne"
            checked={value === 'optionOne'}
            onChange={handleChange}
          />
          <br />
          <Radio
            label={question.optionTwo.text}
            name="radioGroup"
            value="optionTwo"
            checked={value === 'optionTwo'}
            onChange={handleChange}
          />
        </Form.Field>
        {/* Submit button to submit the user's answer */}
        <Form.Field>
          <Button
            color="green"
            size="tiny"
            fluid
            positive
            disabled={disabled}
            content="Submit"
          />
        </Form.Field>
      </Form>
    </>
  );
}

// Define PropTypes to specify the required 'question' prop
PollQuestion.propTypes = {
  question: PropTypes.object.isRequired
};

// Export the PollQuestion component as the default export
export default PollQuestion;
