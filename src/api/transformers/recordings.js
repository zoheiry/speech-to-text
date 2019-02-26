import { omit } from 'lodash';

export const recordingsFromServer = (data = {}) => (
  data.map(recordingFromServer)
);

export const recordingFromServer = (data = {}) => ({
  ...omit(data, ['__v', '_id', 'user']),
  id: data._id,
  userId: data.user,
});
