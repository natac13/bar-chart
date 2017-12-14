import axios from 'axios';
import Promise from 'bluebird';
// import {

// } from '../actions/';
import {
  GET_DATA,
} from '../constants/';

export const CALL_API = Symbol('Call API');


function actionWith(action, extra) {
  const finalAction = Object.assign({}, action, extra);
  delete finalAction[CALL_API];
  return finalAction;
}


async function fetch() {
  const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  const { data } = await axios.get(url);
  return data;
}


// Api Middleware itself
export default ({ dispatch, getState }) => (next) => (action) => {
  const callAPI = action[CALL_API];

  // pass to next middleware if normal action and not a CALL_API action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
console.log('action', action)
  const { type } = action;
console.log('action', action)
console.log('type', type)
/* ====================================
  =            Source Data            =
=====================================*/

  if (type === GET_DATA) {
    const fetchPromise = fetch();
    return fetchPromise.then((response) => {
      console.log('action', action)
      return next(actionWith(action, { payload: response }));
    });
  }

/* =====  End of Security API  ======*/

  return next(action);
};
