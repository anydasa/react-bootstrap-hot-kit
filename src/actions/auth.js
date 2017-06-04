// import { securityCreateToken } from 'utils/api';
import { SET_AUTH } from './../reducers/auth';
import { browserHistory } from 'react-router';
import moment from 'moment';


export function setAuth(data) {
  return {
    type: SET_AUTH,
    data
  };
}

export function removeAuth() {
  return {
    type: SET_AUTH
  };
}

export function logout() {
  return dispatch => dispatch(removeAuth())
}

export function login(values) {

  const params = {
    _username: values.username,
    _password: values.password,
    _type: 'common'
  };

  return securityCreateToken(params)
    .then(res => {

      const now = moment().format('YYYY-MM-DDTHH:mm:ssZ');
      const then = res.datetime;
      const timeOffset = moment(now, 'YYYY-MM-DDTHH:mm:ssZ').diff(moment(then, 'YYYY-MM-DDTHH:mm:ssZ')) / 1000;

      const authData = {
        'username': values.username,
        'type': res.content.type,
        'wsseToken': res.content.token,
        timeOffset
      }

      this.props.dispatch(setAuth(authData))

      browserHistory.push('/')
    })
    .catch(err => {
      throw err.error
    });
}
