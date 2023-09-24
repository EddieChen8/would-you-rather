import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { colors } from '../utils/helpers';

const PollTeaser = ({ question, unanswered }) => {
  const [viewPoll, setViewPoll] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleClick = () => {
    setViewPoll(!viewPoll);
  };

  const buttonColor = unanswered === true ? colors.green : colors.blue;
  const buttonContent = unanswered === true ? 'Answer Poll' : 'Results';

  if (viewPoll === true) {
    navigate(`/questions/${question.id}`); // Use navigate to change the route
    return null; // Render nothing while redirecting
  }

  return (
    <Fragment>
      <Header as="h5" textAlign="left">
        Would you rather
      </Header>
      <p style={{ textAlign: 'center' }}>
        {question.optionOne.text}
        <br />
        or...
      </p>
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

PollTeaser.propTypes = {
  question: PropTypes.object.isRequired,
  unanswered: PropTypes.bool.isRequired,
};

export default PollTeaser;
