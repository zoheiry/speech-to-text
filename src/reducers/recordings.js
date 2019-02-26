import * as types from '../constants/ActionTypes';

const initialState = {
  isFetching: null,
  isUploading: null,
  items: [],
};

const recordings = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOAD_RECORDING_REQUEST: {
      return {
        ...state,
        isUploading: true,
      };
    }
    case types.UPLOAD_RECORDING_SUCCESS: {
      return {
        ...state,
        isUploading: false,
        items: [action.payload.data, ...state.items, ],
      };
    }
    case types.UPLOAD_RECORDING_FAIL: {
      return {
        ...state,
        isUploading: false,
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
