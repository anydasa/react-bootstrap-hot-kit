import isEmpty from 'lodash/isEmpty';
import { SET_AUTH_TOKEN, SET_MINE_INFO, REMOVE_AUTH } from './../actions/auth';

const initialState = {
  isAuthenticated: false,
  user: {},
  token: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.data,
        isAuthenticated: !isEmpty(action.data),
      };
    case SET_MINE_INFO:
      return {
        ...state,
        user: action.data,
      };
    case REMOVE_AUTH:
      return initialState
    default:
      return state;
  }
}