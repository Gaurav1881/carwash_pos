import produce from 'immer';
import {
  ADD_ADD_ON,
  REMOVE_ADD_ON,
  RESET_ALL,
  SET_BASE_SERVICE,
} from './constants';
import { resetAll } from './actions';

// The initial state of the App
export const initialState = {
  baseService: null,
  addOns: [],
};

/* eslint-disable default-case, no-param-reassign */
const serviceSelectionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BASE_SERVICE:
        draft.baseService = action.payload;
        break;
      case ADD_ADD_ON:
        draft.addOns = [...state.addOns, action.payload];
        break;
      case REMOVE_ADD_ON:
        draft.addOns = state.addOns.filter(
          addon => addon.name !== action.payload.name,
        );
        break;
      case RESET_ALL:
        draft.baseService = null;
        draft.addOns = [];
        break;
    }
  });

export default serviceSelectionReducer;
