import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import UserCard from './UserCard';

const Home = () => {
  // Access data from the Redux store using useSelector
  const authUser = useSelector((state) => state.authUser);
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);

  // Determine which questions are answered and unanswered by the authenticated user
  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  // Define panes for the Tab component to display answered and unanswered questions
  const panes = [
    {
      menuItem: 'Unanswered',
      render: () => (
        <Tab.Pane>
          {answered.map((question) => (
            // Render UserCard components for unanswered questions
            <UserCard key={question.id} question_id={question.id} unanswered={true} />
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Answered',
      render: () => (
        <Tab.Pane>
          {unanswered.map((question) => (
            // Render UserCard components for answered questions
            <UserCard key={question.id} question_id={question.id} unanswered={false} />
          ))}
        </Tab.Pane>
      ),
    },
  ];

  // Render a Tab component with the defined panes
  return <Tab panes={panes} className="tab" />;
}

// Define PropTypes for the Home component
Home.propTypes = {
  userQuestionData: PropTypes.object.isRequired, // Expecting user question data as a prop
};

export default Home;
