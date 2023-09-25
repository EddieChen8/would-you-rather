import React from 'react';
import { Container, Header } from 'semantic-ui-react';

// Define the NoMatch component
const NoMatch = () => {
  return (
    <Container textAlign="center">
      {/* Header for 404 Error */}
      <Header as="h3">No Match 404 Error</Header>
      {/* Message for Page Not Found */}
      <p>Nothing to see here. Please use the menu to try again.</p>
    </Container>
  );
};

// Export the NoMatch component as the default export
export default NoMatch;
