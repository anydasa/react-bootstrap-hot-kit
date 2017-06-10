import httpClient from './httpClient';

export function auth(username, password) {

  const values = {
    /* eslint-disable */
    client_id: REST_CLIENT_ID,
    client_secret: REST_CLIENT_SECRET,
    grant_type: 'password',
    username,
    password
    /* eslint-enable */
  }

  return httpClient.post('/oauth/v2/token', values)
    .then(res => res.data)
    .catch(res => {throw res.response.data})
}

export function getUsers() {
  return httpClient.get('/api/admin/v1/users')
    .then(res => res.data)
    .catch(res => {throw res.response.data})
}

export function getMineInfo() {
  return httpClient.get('/api/v1/users/get-mine')
    .then(res => res.data.user)
    .catch(res => {throw res.response.data})
}

