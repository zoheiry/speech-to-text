import axios from 'axios';
import { get as lodashGet } from 'lodash';
import { fromServer as userFromServer } from './transformers/user';
import { recordingFromServer, recordingsFromServer } from './transformers/recordings';
import { getCookie, deleteCookie } from '../utils/cookies';

const execute = (method, endpoint, data = {}, config = {}, headers = {}) => {
  const defaultHeaders = {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: 0,
    'x-access-token': getCookie('auth') || '',
  };

  return axios({
    method,
    url: endpoint,
    data,
    config,
    headers: { ...defaultHeaders, ...headers },
  });
};

export const handleAuthorizationFailure = (error) => {
  const errorName = lodashGet(error, 'response.data.name');
  if (errorName === 'TokenExpiredError' || errorName === 'JsonWebTokenError') {
    deleteCookie('auth');
    window.location.href = '/login'; // triggers a refresh to reset redux state
  }
  return error;
};

const get = (endpoint, extraHeaders = {}) =>
  execute('get', endpoint, undefined, undefined, extraHeaders);

const post = (endpoint, data, config, extraHeaders) =>
  execute('post', endpoint, data, config, extraHeaders);

const put = (endpoint, data) => execute('put', endpoint, data);

// const del = (endpoint) => execute('delete', endpoint);

export const getUser = () =>
  get('/api/user/self').then((response) => userFromServer(response.data));

export const authenticateUser = ({ email, password }) =>
  post('/api/user/authenticate', { email, password }).then((response) => ({
    token: response.data.token,
    user: userFromServer(response.data.user),
  }));

export const createUser = ({ email, password, passwordConfirmation }) =>
  post('/api/user/create', { email, password, passwordConfirmation }).then((response) =>
    userFromServer(response.data)
  );

export const changePassword = (password) =>
  put('api/user/self/change_password', { password }).then((response) =>
    userFromServer(response.data)
  );

export const uploadRecording = (data) =>
  post('/api/recording/upload', data).then((response) => recordingFromServer(response.data));

export const getRecordings = () =>
  get('/api/recordings').then((response) => recordingsFromServer(response.data));
