import * as types from '../constants/ActionTypes';

const initialState = {
  id: null,
  email: null,
  schedule: null,
  isFetching: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_USER: {
      return {
        ...state,
        isFetching: true
      };
    }
    case types.REQUEST_USER_SUCCESS:
    case types.AUTHENTICATE_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload.user,
        error: null,
        isFetching: false
      }
    }
    case types.REQUEST_USER_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    }
    case types.AUTHENTICATE_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        authenticationError: null,
      }
    }
    case types.AUTHENTICATE_USER_FAIL: {
      return {
        ...state,
        isFetching: false,
        authenticationError: action.payload.error,
      }
    }
    case types.CREATE_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        registrationError: null,
      }
    }
    case types.CREATE_USER_FAIL: {
      return {
        ...state,
        isFetching: false,
        registrationError: action.payload.error,
      }
    }
    case types.CREATE_USER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        registrationError: null,
      }
    }
    default:
      return state;
  }
};

export default user;
