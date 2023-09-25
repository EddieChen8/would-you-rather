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

// Define the Login component
const Login = () => {
  // Define state variables using React Hooks
  const [loading, setLoading] = useState(false); // For displaying loading indicator
  const [value, setValue] = useState(''); // For user selection
  const dispatch = useDispatch(); // Access the dispatch function from Redux
  const users = useSelector((state) => Object.values(state.users)); // Access user data from the Redux store

  // Function to set loading state
  const handleLoading = () => {
    setLoading(true);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    new Promise((res, rej) => {
      handleLoading(); // Activate loading indicator
      setTimeout(() => res(), 500); // Simulate loading delay
    }).then(() => dispatch(setAuthUser(value))); // Dispatch an action to set the authenticated user
  };

  // Generate dropdown data for user selection
  const generateDropdownData = () => {
    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }));
  };

  // Determine if the form submission button should be disabled
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
    </>
  );
};

// Define the LoginHeader component
const LoginHeader = () => (
  <Header as="h4" block attached="top" textAlign="center">
    <Header.Content>Welcome to the Would You Rather App!</Header.Content>
    <Header.Subheader>Please sign in to continue</Header.Subheader>
  </Header>
);

// Define the LoginGridLayout component
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

// Define the BrandImage component
const BrandImage = () => (
  <Image src="/images/avatars/animals.png" size="medium" centered />
);

// Define the ConnectedLoginForm component
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

// Define PropTypes for the ConnectedLoginForm component
ConnectedLoginForm.propTypes = {
  onLoading: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  generateDropdownData: PropTypes.func.isRequired
};

// Export the Login component as the default export
export default Login;
