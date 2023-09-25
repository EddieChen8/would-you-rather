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

// Define an array of trophy colors for the top 3 leaderboard positions
const trophyColor = ['yellow', 'grey', 'orange'];

const Leaderboard = () => {
  // Retrieve leaderboard data from the Redux store using useSelector
  const leaderboardData = useSelector((state) => {
    const users = state.users;

    // Transform user data into a leaderboard format
    return Object.values(users)
      .map((user) => ({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answerCount: Object.values(user.answers).length, // Count of answered questions
        questionCount: user.questions.length, // Count of created questions
        total: Object.values(user.answers).length + user.questions.length, // Total score
      }))
      .sort((a, b) => b.total - a.total) // Sort users by their total score in descending order
      .slice(0, 3); // Get the top 3 users with the highest scores
  });

  return (
    <>
      {/* Map through the leaderboard data and render user profiles */}
      {leaderboardData.map((user, idx) => (
        <Segment.Group key={user.id}>
          {/* Display a trophy icon with a color for the top 3 users */}
          <Label corner="left" icon="trophy" color={trophyColor[idx]} />
          <Grid divided padded>
            <Grid.Row>
              <Grid.Column width={4} verticalAlign="middle">
                {/* Display the user's avatar */}
                <Image src={user.avatarURL} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3" textAlign="left">
                  {/* Display the user's name */}
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
                    {/* Display the user's total score */}
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

// Define PropTypes for the Leaderboard component
Leaderboard.propTypes = {
  leaderboardData: PropTypes.array.isRequired, // Expecting an array of leaderboard data as a prop
};

export default Leaderboard;
