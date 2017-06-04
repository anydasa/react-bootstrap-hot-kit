import isEmpty from 'lodash/isEmpty';

export const SET_AUTH = 'SET_AUTH'

const initialState = {
  isAuthenticated: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...action.data,
        isAuthenticated: !isEmpty(action.data),
      };
    default:
      return state;
  }
}