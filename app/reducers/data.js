import Immutable from 'immutable';
import {
  GET_DATA,
} from 'Constants/';


const initialState = Immutable.Map({
  data: undefined,
});


export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return state.set('data', Immutable.fromJS(action.payload));
    default:
      return state;
  }
}
