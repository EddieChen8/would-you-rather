import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate,Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { handleSaveQuestion } from '../actions/questions';

function NewPoll() {
  const authUser = useSelector((state) => state.authUser);
  const [state, setState] = useState({
    validSubmit: false,
    isLoading: false,
    option1: '',
    option2: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { option1, option2 } = state;
    new Promise(async (res, rej) => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true
      }));
      dispatch(handleSaveQuestion(option1, option2, authUser));

      setTimeout(() => res('success'), 1000);
    }).then(() => {
      setState({
        validSubmit: true,
        option1: '',
        option2: ''
      });
      navigate('/');
    });
  };

  const disabled = state.option1 === '' || state.option2 === '';

  if (state.validSubmit === true) {
    return <Navigate to="/" />;
  }

  return (
    <Segment.Group>
      <Header as="h3" textAlign="left" block attached="top">
        Create a New Poll
      </Header>
      <Grid padded>
        <Grid.Column>
          {state.isLoading && (
            <Dimmer active inverted>
              <Loader content="Updating" />
            </Dimmer>
          )}
          <p>Complete the question:</p>
          <p>
            <strong>Would you rather...</strong>
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              id="option1"
              placeholder="Enter option one..."
              value={state.option1}
              onChange={handleChange}
              required
            />
            <Divider horizontal>Or</Divider>
            <Form.Input
              id="option2"
              placeholder="Enter option two..."
              value={state.option2}
              onChange={handleChange}
              required
            />
            <Form.Button positive size="tiny" fluid disabled={disabled}>
              Submit
            </Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    </Segment.Group>
  );
}

NewPoll.propTypes = {
  authUser: PropTypes.string.isRequired,
  handleSaveQuestion: PropTypes.func.isRequired
};

export default NewPoll;