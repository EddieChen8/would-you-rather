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

const Nav = () => {
  const authUser = useSelector((state) => state.authUser);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setAuthUser(null));
    navigate('/');
  };

  

  return (
    <Container>
      <Header as={Menu} minWidth={651} pointing secondary>
        <Menu.Item name="home" as={NavLink} to="/" />
        <Menu.Item name="new poll" as={NavLink} to="/add" />
        <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />
        <Menu.Menu position="right">
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

export default Nav;
