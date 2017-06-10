import axios from 'axios'
import { logout } from './../actions/auth'
import { store } from './../index'

axios.interceptors.request.use(function (config) {
  const { isAuthenticated, token } = store.getState().auth

  if (isAuthenticated) {
    config.headers['Authorization'] = 'Bearer ' + token.access_token;
  }

  return config;
}, function () {
  // Do something with request error
  // return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    store.dispatch(logout())
  }
  return Promise.reject(error);
});


export default axios