import { omit } from 'lodash';

export const fromServer = (data) => ({
  ...omit(data, ['__v', '_id', 'password']),
  id: data._id
});

export default fromServer;
