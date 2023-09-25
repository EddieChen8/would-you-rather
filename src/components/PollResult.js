import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Header,
  Segment,
  Progress,
  Label,
  Button,
  Icon
} from 'semantic-ui-react';
import { styles } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

// Component to display a label indicating the user's vote
const YourVoteLabel = () => (
  <Label color="orange" ribbon="right" className="vote">
    <Icon name="check circle outline" size="big" className="compact" />
    <div style={{ float: 'right' }}>
      Your
      <br />
      Vote
    </div>
  </Label>
);

// Component to display poll results
const PollResult = ({ question }) => {
  // Access the authenticated user's data from the Redux store
  const user = useSelector((state) => state.users[state.authUser]);
  const navigate = useNavigate();

  // Count the number of votes for each option
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const votesTotal = optionOneVotes + optionTwoVotes;
  const userVote = user.answers[question.id];

  // Determine the styles for displaying the winning option
  let option1 = styles.secondary,
    option2 = styles.secondary;
  if (optionOneVotes > optionTwoVotes) {
    option1 = styles.primary;
  } else if (optionTwoVotes > optionOneVotes) {
    option2 = styles.primary;
  }

  // Handle click to navigate back to the home page
  const handleClick = () => {
    navigate('/');
  };

  return (
    <Fragment>
      {/* Display the header with the question text */}
      <Header as="h3">
        Results:
        <Header.Subheader style={{ fontWeight: 'bold' }}>
          Would you rather
        </Header.Subheader>
      </Header>
      {/* Display the first poll option */}
      <Segment
        color={option1.color}
        style={{ backgroundColor: `${option1.bgColor}` }}
      >
        {/* Display the user's vote label if they voted for this option */}
        {userVote === 'optionOne' && <YourVoteLabel />}
        {/* Display the option text */}
        <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
        {/* Display the progress bar indicating the vote percentage */}
        <Progress
          percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
          progress
          color={option1.color}
        >
          {optionOneVotes} out of {votesTotal} votes
        </Progress>
      </Segment>
      {/* Display the second poll option */}
      <Segment
        color={option2.color}
        style={{ backgroundColor: `${option2.bgColor}` }}
      >
        {/* Display the user's vote label if they voted for this option */}
        {userVote === 'optionTwo' && <YourVoteLabel />}
        {/* Display the option text */}
        <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
        {/* Display the progress bar indicating the vote percentage */}
        <Progress
          percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
          progress
          color={option2.color}
        >
          {optionTwoVotes} out of {votesTotal} votes
        </Progress>
      </Segment>
      {/* Button to navigate back to the home page */}
      <Button size="tiny" floated="right" onClick={handleClick}>
        Back
      </Button>
    </Fragment>
  );
}

// Define PropTypes to specify the required 'question' prop
PollResult.propTypes = {
  question: PropTypes.object.isRequired,
};

// Export the PollResult component as the default export
export default PollResult;
