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
  const { type } = action;
/* ====================================
  =            Source Data            =
=====================================*/

  if (type === GET_DATA) {
    const fetchPromise = fetch();
    return fetchPromise.then((response) => {
      const payload = {
        column_names: response.column_names,
        data: response.data,
        description: response.description,
        frequency: response.frequency,
        from_date: response.from_date,
        to_date: response.to_date,
        name: response.name.split(',')[0],
      }
      return next(actionWith(action, { payload }));
    });
  }

/* =====  End of Security API  ======*/

  return next(action);
};
