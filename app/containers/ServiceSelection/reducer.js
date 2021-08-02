import produce from 'immer';
import moment from 'moment';

import {
  ADD_ADD_ON,
  ADD_TO_LOGS,
  REMOVE_ADD_ON,
  RESET_ALL,
  SET_BASE_SERVICE,
} from './constants';
import { resetAll } from './actions';

// The initial state of the App
export const initialState = {
  baseService: null,
  addOns: [],
  washLog: {},
};

/* eslint-disable default-case, no-param-reassign */
const serviceSelectionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BASE_SERVICE:
        draft.baseService = action.payload;
        draft.addOns = action.payload.addOns.map(addOn => ({
          ...addOn,
          quantity: 0,
        }));
        break;
      case ADD_ADD_ON:
        const index = draft.addOns.findIndex(
          addon => addon.name === action.payload.name,
        );
        if (index === -1) {
          draft.addOns = [...state.addOns, {...action.payload, quantity: 1}];
        } else {
          draft.addOns[index].quantity += 1;
        }
        break;
      case REMOVE_ADD_ON:
        const removeIndex = state.addOns.findIndex(addon => addon.name === action.payload.name);
        if (removeIndex > -1) {
          draft.addOns[removeIndex].quantity -= 1;
        }
        break;
      case ADD_TO_LOGS:
        let dateKey = moment().format('MM-DD-YYYY');
        if (draft.washLog[dateKey]) {
          let data = draft.washLog[dateKey];
          if (data[draft.baseService.name]) {
            data[draft.baseService.name] += 1;
          } else {
            data[draft.baseService.name] = 1;
          }
        } else {
          draft.washLog = {};
          draft.washLog[dateKey] = {
            [draft.baseService.name]: 1,
          };
        }
        break;
      case RESET_ALL:
        draft.baseService = null;
        draft.addOns = [];
        break;
    }
  });

export default serviceSelectionReducer;
