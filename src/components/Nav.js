import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Menu,
  Header,
  Image,
  Grid,
  Button,
  Container
} from 'semantic-ui-react';
import { setAuthUser } from '../actions/authUser';

// Define the Nav component
const Nav = () => {
  // Access data from the Redux store using useSelector
  const authUser = useSelector((state) => state.authUser); // Authenticated user
  const users = useSelector((state) => state.users); // User data
  const dispatch = useDispatch(); // Get the dispatch function
  const navigate = useNavigate(); // Access the navigation function from React Router

  // Function to handle user logout
  const handleLogout = () => {
    dispatch(setAuthUser(null)); // Dispatch an action to set the authenticated user to null (logout)
    navigate('/'); // Navigate to the home page after logout
  };

  return (
    <Container>
      {/* Header and navigation menu */}
      <Header as={Menu} minWidth={651} pointing secondary>
        <Menu.Item name="home" as={NavLink} to="/" />
        <Menu.Item name="new poll" as={NavLink} to="/add" />
        <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />
        <Menu.Menu position="right">
          {/* Display user information and logout button */}
          <Menu.Item>
            <span>
              <Image
                src={users[authUser].avatarURL}
                avatar
                spaced="right"
                verticalAlign="bottom"
              />
              {users[authUser].name}
            </span>
          </Menu.Item>
          <Menu.Item>
            {/* Logout button */}
            <Button
              content="Logout"
              labelPosition="right"
              basic
              compact
              icon="log out"
              size="mini"
              onClick={handleLogout}
            />
          </Menu.Item>
        </Menu.Menu>
      </Header>
    </Container>
  );
};

// Export the Nav component as the default export
export default Nav;
