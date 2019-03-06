import * as types from '../constants/ActionTypes';
import { IDLE, BUSY, SUCCESS, ERROR } from '../constants/UploadStatuses';

const initialState = {
  isFetching: null,
  uploadStatus: IDLE,
  items: [],
};

const recordings = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_RECORDING_REQUEST: {
      return {
        ...state,
        uploadStatus: BUSY,
      };
    }
    case types.UPLOAD_RECORDING_SUCCESS: {
      return {
        ...state,
        uploadStatus: SUCCESS,
      };
    }
    case types.UPLOAD_RECORDING_FAIL: {
      return {
        ...state,
        uploadStatus: ERROR,
        uploadError: action.err,
      };
    }
    case types.GET_RECORDINGS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.GET_RECORDINGS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        items: action.payload.data,
      };
    }
    case types.GET_RECORDINGS_FAIL: {
      return {
        ...state,
        isFetching: false,
        fetchError: action.err,
      };
    }
    default:
      return state;
  }
};

export default recordings;
