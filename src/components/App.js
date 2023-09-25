import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { handleInitialData } from '../actions/shared';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import Login from './Login';
import Nav from './Nav';
import Home from './Home';
import UserCard from './UserCard';
import NewPoll from './NewPoll';
import Leaderboard from './Leaderboard';
import NoMatch from './NoMatch';

const App = () => {
  // Access the authenticated user from the Redux store
  const authUser = useSelector((state) => state.authUser);
  // Get the dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Use useEffect to fetch initial data when the component mounts
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        {authUser === null ? ( // Conditional rendering based on the authenticated user
          <Routes>
            <Route
              path="/"
              element={
                <ContentGrid>
                  <Login />
                </ContentGrid>
              }
            />
          </Routes>
        ) : (
          <Fragment>
            <Nav /> {/* Render the navigation component when a user is authenticated */}
            <ContentGrid>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/questions/bad_id" element={<NoMatch />} />
                <Route path="/questions/:question_id" element={<UserCard />} />
                <Route path="/add" element={<NewPoll />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route element={<NoMatch />} />
              </Routes>
            </ContentGrid>
          </Fragment>
        )}
      </div>
    </Router>
  );
}

// A reusable component for rendering content within a grid
const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

export default App;
