// logger middleware for Redux
const logger = store => next => action => {
  // Start a console group for the current action type
  console.group(action.type);
  
  // Log the current action
  console.log('The action:', action);

  // Call the next middleware in the chain or the reducer
  const returnValue = next(action);

  // Log the new state after the action is processed
  console.log('The new state: ', store.getState());

  // End the console group for the current action type
  console.groupEnd();

  // Return the value returned by the next middleware or reducer
  return returnValue;
};

export default logger;

