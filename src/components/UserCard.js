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

const pollTypes = {
  POLL_TEASER: 'POLL_TEASER',
  POLL_QUESTION: 'POLL_QUESTION',
  POLL_RESULT: 'POLL_RESULT',
};

const PollContent = ({ pollType, question, unanswered }) => {
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

const UserCard = ({ question_id }) => {
  const { question, author, pollType, badPath, unanswered = null } = useSelector(
    (state) => {
      const { users, questions, authUser } = state;
      let question, author, pollType, badPath = false;

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

  if (badPath === true) {
    return <Navigate to="/questions/bad_id" />;
  }

  const tabColor = unanswered === true ? colors.green : colors.blue;
  const borderTop =
    unanswered === null
      ? `1px solid ${colors.grey}`
      : `2px solid ${tabColor.hex}`;

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

UserCard.propTypes = {
  question_id: PropTypes.string,
};

export default UserCard;
