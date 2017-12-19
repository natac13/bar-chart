import Immutable from 'immutable';
import {
  GET_DATA,
} from 'Constants/';


const initialState = Immutable.Map({});


export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return action.payload;
    default:
      return state;
  }
}
