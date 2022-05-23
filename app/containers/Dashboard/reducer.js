import produce from 'immer';

import { SET_LOGS } from './constants';

// The initial state of the App
export const initialState = {
  logs: [],
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOGS:
        draft.logs = action.payload;
        break;
    }
  });

export default dashboardReducer;
