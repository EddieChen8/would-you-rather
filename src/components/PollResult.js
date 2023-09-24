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

function PollResult({ question }) {
  const user = useSelector((state) => state.users[state.authUser]);
  const navigate = useNavigate();

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const votesTotal = optionOneVotes + optionTwoVotes;
  const userVote = user.answers[question.id];

  let option1 = styles.secondary,
    option2 = styles.secondary;
  if (optionOneVotes > optionTwoVotes) {
    option1 = styles.primary;
  } else if (optionTwoVotes > optionOneVotes) {
    option2 = styles.primary;
  }

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Fragment>
      <Header as="h3">
        Results:
        <Header.Subheader style={{ fontWeight: 'bold' }}>
          Would you rather
        </Header.Subheader>
      </Header>
      <Segment
        color={option1.color}
        style={{ backgroundColor: `${option1.bgColor}` }}
      >
        {userVote === 'optionOne' && <YourVoteLabel />}
        <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
        <Progress
          percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
          progress
          color={option1.color}
        >
          {optionOneVotes} out of {votesTotal} votes
        </Progress>
      </Segment>
      <Segment
        color={option2.color}
        style={{ backgroundColor: `${option2.bgColor}` }}
      >
        {userVote === 'optionTwo' && <YourVoteLabel />}

        <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
        <Progress
          percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
          progress
          color={option2.color}
        >
          {optionTwoVotes} out of {votesTotal} votes
        </Progress>
      </Segment>
      <Button size="tiny" floated="right" onClick={handleClick}>
        Back
      </Button>
    </Fragment>
  );
}

PollResult.propTypes = {
  question: PropTypes.object.isRequired,
};

export default PollResult;
