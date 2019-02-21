import * as types from '../constants/ActionTypes';

const uploadRecordingRequest = () => ({ type: types.UPLOAD_RECORDING_REQUEST });

const uploadRecordingSuccess = () => ({ type: types.UPLOAD_RECORDING_SUCCESS });

const uploadRecordingFail = () => ({ type: types.UPLOAD_RECORDING_FAIL });

export const uploadRecording = (file) => (dispatch, _, api) => {
  if (!file) {
    throw Error('You are trying to uploading "null" please make sure to select a file.');
  }
  dispatch(uploadRecordingRequest());

  const data = new FormData();
  data.append('file', file);
  data.append('name', file.name);
  return api
    .uploadRecording(data)
    .then(() => dispatch(uploadRecordingSuccess()))
    .catch(() => dispatch(uploadRecordingFail()));
};

export default { uploadRecording };
