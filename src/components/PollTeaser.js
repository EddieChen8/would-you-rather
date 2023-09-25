import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { colors } from '../utils/helpers';

// Component to display a teaser for a poll question
const PollTeaser = ({ question, unanswered }) => {
  // Define a state variable to track whether to view the poll or not
  const [viewPoll, setViewPoll] = useState(false);

  // Use the useNavigate hook to access the navigation function
  const navigate = useNavigate();

  // Toggle the viewPoll state when the "Answer Poll" or "Results" button is clicked
  const handleClick = () => {
    setViewPoll(!viewPoll);
  };

  // Determine the color and content of the button based on whether the question is unanswered
  const buttonColor = unanswered === true ? colors.green : colors.blue;
  const buttonContent = unanswered === true ? 'Answer Poll' : 'Results';

  // If viewPoll is true, redirect to the poll details page and return null (no rendering)
  if (viewPoll === true) {
    navigate(`/questions/${question.id}`); // Use navigate to change the route
    return null; // Render nothing while redirecting
  }

  // Render the poll teaser with question text and the "Answer Poll" or "Results" button
  return (
    <Fragment>
      {/* Display the question text */}
      <Header as="h5" textAlign="left">
        Would you rather
      </Header>
      <p style={{ textAlign: 'center' }}>
        {question.optionOne.text}
        <br />
        or...
      </p>
      {/* Display the button for viewing the poll */}
      <Button
        color={buttonColor.name}
        size="tiny"
        fluid
        onClick={handleClick}
        content={buttonContent}
      />
    </Fragment>
  );
};

// Define PropTypes to specify the required props
PollTeaser.propTypes = {
  question: PropTypes.object.isRequired,
  unanswered: PropTypes.bool.isRequired,
};

// Export the PollTeaser component as the default export
export default PollTeaser;
