import thunk from 'redux-thunk';
import logger from './logger';
import { applyMiddleware } from 'redux';

// Thunk middleware allows asynchronous actions, while the logger middleware
// logs Redux actions and state changes for debugging purposes.
export default applyMiddleware(thunk, logger);
