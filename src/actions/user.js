import * as types from '../constants/ActionTypes';

const requestUser = () => ({ type: types.REQUEST_USER });

const requestUserSuccess = (user) => ({
  type: types.REQUEST_USER_SUCCESS,
  payload: { user }
})

const requestUserFail = (error) => ({
  type: types.REQUEST_USER_FAIL,
  payload: { error },
});

const authenticateUserRequest = () => ({ type: types.AUTHENTICATE_USER_REQUEST });

const authenticateUserSuccess = (user) => ({
  type: types.AUTHENTICATE_USER_SUCCESS,
  payload: { user }
})

const authenticateUserFail = (error) => ({
  type: types.AUTHENTICATE_USER_FAIL,
  payload: { error },
});

const createUserRequest = () => ({ type: types.CREATE_USER_REQUEST });

const createUserFail = (error) => ({
  type: types.CREATE_USER_FAIL,
  payload: { error },
});

const createUserSuccess = (user) => ({
  type: types.CREATE_USER_SUCCESS,
  payload: { user },
});

export const getUser = () => (dispatch, getState, api) => {
  dispatch(requestUser());
  return api.getUser()
    .then(user => dispatch(requestUserSuccess(user)))
    .catch((error) => dispatch(requestUserFail(error)));
};

export const authenticateUser = (userInfo) => (dispatch, getState, api) => {
  dispatch(authenticateUserRequest());

  return api.authenticateUser(userInfo)
    .then((data) => {
      dispatch(authenticateUserSuccess(data.user));
      return data;
    })
    .catch((error) => {
      dispatch(authenticateUserFail(error));
      return error;
    })
};

export const createUser = (userInfo) => (dispatch, getState, api) => {
  dispatch(createUserRequest());

  return api.createUser(userInfo)
    .then((data) => {
      dispatch(createUserSuccess(data.user));
      return data;
    })
    .catch((error) => {
      dispatch(createUserFail(error));
      return error;
    })
};
