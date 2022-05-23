import { GET_LOGS, SET_LOGS } from './constants';

export const getServiceLogs = () => ({
  type: GET_LOGS,
});

export const setServiceLogs = payload => ({
  type: SET_LOGS,
  payload,
});
