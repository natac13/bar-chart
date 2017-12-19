export * from './apiCreators.js';

export { reset } from 'redux-form/immutable';

import { createAction } from 'redux-actions';
import { SET_ERROR, CLEAR_ERROR } from '../constants/';

const setError = createAction(SET_ERROR);
const clearError = createAction(CLEAR_ERROR);

export {
  setError,
  clearError,
};

