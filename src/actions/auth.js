import { auth, getMineInfo } from './../utils/api'

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export const REMOVE_AUTH = 'REMOVE_AUTH_TOKEN'
export const SET_MINE_INFO = 'SET_AUTH'


export function logout() {
  return dispatch => dispatch({ type: REMOVE_AUTH })
}

export function login(username, password) {
  return dispatch => {
    return auth(username, password)
      .then(token => dispatch({ type: SET_AUTH_TOKEN, data: token }))
  }
}

export function fetchMineInfo() {
  return dispatch => {
    getMineInfo()
      .then(userInfo => dispatch({ type: SET_MINE_INFO, data: userInfo }))
  }
}