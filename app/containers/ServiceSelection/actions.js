import {
  ADD_ADD_ON,
  REMOVE_ADD_ON,
  RESET_ALL,
  SET_BASE_SERVICE,
} from './constants';

export const setBaseService = payload => ({
  type: SET_BASE_SERVICE,
  payload,
});

export const addAddOn = payload => ({
  type: ADD_ADD_ON,
  payload,
});

export const removeAddOn = payload => ({
  type: REMOVE_ADD_ON,
  payload,
});

export const resetAll = () => ({
  type: RESET_ALL,
});
