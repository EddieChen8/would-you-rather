import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import PollQuestion from './PollQuestion';
import PollResult from './PollResult';
import PollTeaser from './PollTeaser';
import { colors } from '../utils/helpers';
import { useParams } from 'react-router-dom';

// Define constants to represent different types of poll content
const pollTypes = {
  POLL_TEASER: 'POLL_TEASER',
  POLL_QUESTION: 'POLL_QUESTION',
  POLL_RESULT: 'POLL_RESULT',
};

// Component for rendering different types of poll content
const PollContent = ({ pollType, question, unanswered }) => {
  // Render the appropriate poll content based on the pollType prop
  switch (pollType) {
    case pollTypes.POLL_TEASER:
      return <PollTeaser question={question} unanswered={unanswered} />;
    case pollTypes.POLL_QUESTION:
      return <PollQuestion question={question} />;
    case pollTypes.POLL_RESULT:
      return <PollResult question={question} />;
    default:
      return null;
  }
};

// UserCard component to display user-related poll content
const UserCard = ({ question_id }) => {
  // Use useSelector to access Redux store state and extract relevant data
  const { question, author, pollType, badPath, unanswered = null } = useSelector(
    (state) => {
      const { users, questions, authUser } = state;
      let question, author, pollType, badPath = false;

      // Determine the question, author, and pollType based on the route and user's answers
      if (question_id !== undefined) {
        question = questions[question_id];
        author = users[question.author];
        pollType = pollTypes.POLL_TEASER;
      } else {
        const user = users[authUser];
        const { question_id } = useParams();
        question = questions[question_id];

        if (question === undefined) {
          badPath = true;
        } else {
          author = users[question.author];
          pollType = pollTypes.POLL_QUESTION;
          if (Object.keys(user.answers).includes(question.id)) {
            pollType = pollTypes.POLL_RESULT;
          }
        }
      }

      return {
        badPath,
        question,
        author,
        pollType,
      };
    }
  );

  // If the route is invalid, navigate to a "bad_id" page
  if (badPath === true) {
    return <Navigate to="/questions/bad_id" />;
  }

  // Determine the tab color and border styling based on whether the question is unanswered
  const tabColor = unanswered === true ? colors.green : colors.blue;
  const borderTop =
    unanswered === null
      ? `1px solid ${colors.grey}`
      : `2px solid ${tabColor.hex}`;

  // Render the UserCard with user information and poll content
  return (
    <Segment.Group>
      <Header
        as="h5"
        textAlign="left"
        block
        attached="top"
        style={{ borderTop: borderTop }}
      >
        {author.name} asks:
      </Header>

      <Grid divided padded>
        <Grid.Row>
          <Grid.Column width={5}>
            <Image src={author.avatarURL} />
          </Grid.Column>
          <Grid.Column width={11}>
            <PollContent
              pollType={pollType}
              question={question}
              unanswered={unanswered}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment.Group>
  );
};

// Define PropTypes to specify the required props
UserCard.propTypes = {
  question_id: PropTypes.string,
};

// Export the UserCard component as the default export
export default UserCard;
