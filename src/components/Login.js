import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Segment,
  Grid,
  Header,
  Image,
  Form,
  Loader,
  Dimmer
} from 'semantic-ui-react';
import { setAuthUser } from '../actions/authUser';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => Object.values(state.users));

  const handleLoading = () => {
    setLoading(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    new Promise((res, rej) => {
      handleLoading();
      setTimeout(() => res(), 500);
    }).then(() => dispatch(setAuthUser(value)));
  };

  const generateDropdownData = () => {
    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }));
  };

  const disabled = value === '' ? true : false;

  return (
    <>
      <Segment.Group>
        <LoginHeader />
        <LoginGridLayout
          image={<BrandImage />}
          form={
            <ConnectedLoginForm
              onLoading={handleLoading}
              value={value}
              onChange={(e, data) => setValue(data.value)}
              onSubmit={handleSubmit}
              disabled={disabled}
              generateDropdownData={generateDropdownData}
            />
          }
          loading={loading}
        />
      </Segment.Group>
      <footer className="footer">
        <a href="https://www.freepik.com/free-photos-vectors/design">
          Avatar characters created by freepik - www.freepik.com
        </a>
      </footer>
    </>
  );
};

const LoginHeader = () => (
  <Header as="h4" block attached="top" textAlign="center">
    <Header.Content>Welcome to the Would You Rather App!</Header.Content>
    <Header.Subheader>Please sign in to continue</Header.Subheader>
  </Header>
);

const LoginGridLayout = ({ image, form, loading }) => (
  <div>
    <Grid padded textAlign="center">
      <Grid.Row className="login">
        <Grid.Column width={16}>
          {loading === true && (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          )}
          {image}
          <br />
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

const BrandImage = () => (
  <Image src="/images/avatars/animals.png" size="medium" centered />
);

const ConnectedLoginForm = ({
  onLoading,
  value,
  onChange,
  onSubmit,
  disabled,
  generateDropdownData
}) => (
  <Form onSubmit={onSubmit}>
    <Header as="h2" color="green">
      Sign In
    </Header>
    <Form.Dropdown
      placeholder="Select a Friend"
      fluid
      selection
      scrolling
      options={generateDropdownData()}
      value={value}
      onChange={onChange}
      required
    />
    <Form.Button content="Login" positive disabled={disabled} fluid />
  </Form>
);

ConnectedLoginForm.propTypes = {
  onLoading: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  generateDropdownData: PropTypes.func.isRequired
};

export default Login;
