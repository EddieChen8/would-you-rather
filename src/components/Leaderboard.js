import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Segment,
  Grid,
  Header,
  Image,
  Label,
  Divider
} from 'semantic-ui-react';

const trophyColor = ['yellow', 'grey', 'orange'];

const Leaderboard = () => {
  const leaderboardData = useSelector((state) => {
    const users = state.users;

    return Object.values(users)
      .map((user) => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length,
        questionCount: user.questions.length,
        total: Object.values(user.answers).length + user.questions.length
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);
  });

  return (
    <>
      {leaderboardData.map((user, idx) => (
        <Segment.Group key={user.id}>
          <Label corner="left" icon="trophy" color={trophyColor[idx]} />
          <Grid divided padded>
            <Grid.Row>
              <Grid.Column width={4} verticalAlign="middle">
                <Image src={user.avatarURL} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3" textAlign="left">
                  {user.name}
                </Header>
                <Grid>
                  <Grid.Column width={12}>Answered questions</Grid.Column>
                  <Grid.Column width={4}>{user.answerCount}</Grid.Column>
                </Grid>
                <Divider />
                <Grid>
                  <Grid.Column width={12}>Created questions</Grid.Column>
                  <Grid.Column width={4}>{user.questionCount}</Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column width={4} textAlign="center">
                <Segment.Group>
                  <Header as="h5" block attached="top" content="Score" />
                  <Segment>
                    <Label circular color="green" size="big">
                      {user.questionCount + user.answerCount}
                    </Label>
                  </Segment>
                </Segment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment.Group>
      ))}
    </>
  );
};

Leaderboard.propTypes = {
  leaderboardData: PropTypes.array.isRequired
};

export default Leaderboard;