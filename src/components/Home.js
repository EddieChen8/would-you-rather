import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import UserCard from './UserCard';

function Home() {
  const authUser = useSelector((state) => state.authUser);
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);

  const answeredIds = Object.keys(users[authUser].answers);
  const answered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const panes = [
    {
      menuItem: 'Unanswered',
      render: () => (
        <Tab.Pane>
          {answered.map((question) => (
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
            <UserCard key={question.id} question_id={question.id} unanswered={false} />
          ))}
        </Tab.Pane>
      ),
    },
  ];

  return <Tab panes={panes} className="tab" />;
}

Home.propTypes = {
  userQuestionData: PropTypes.object.isRequired,
};

export default Home;
