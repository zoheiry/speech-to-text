import * as types from '../constants/ActionTypes';

const uploadRecordingRequest = () => ({ type: types.UPLOAD_RECORDING_REQUEST });

const uploadRecordingSuccess = () => ({ type: types.UPLOAD_RECORDING_SUCCESS });

const uploadRecordingFail = (err) => ({ type: types.UPLOAD_RECORDING_FAIL, err });

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
    .catch((err) => dispatch(uploadRecordingFail(err)));
};


const getRecordingsRequest = () => ({ type: types.GET_RECORDINGS_REQUEST });

const getRecordingsSuccess = (data) => ({
  type: types.GET_RECORDINGS_SUCCESS,
  payload: { data },
});

const getRecordingsFail = (err) => ({ type: types.GET_RECORDINGS_FAIL, err });

export const getRecordings = () => (dispatch, _, api) => {
  dispatch(getRecordingsRequest());

  return api
    .getRecordings()
    .then((data) => dispatch(getRecordingsSuccess(data)))
    .catch((err) => dispatch(getRecordingsFail(err)))
}

export default { uploadRecording };
