/**
 * SignInPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectServiceSelection = state =>
  state.ServiceSelectionPage || initialState;

const selectBaseService = () =>
  createSelector(
    selectServiceSelection,
    state => state.baseService,
  );

const selectAddOns = () =>
  createSelector(
    selectServiceSelection,
    state => state.addOns,
  );

const selectWashLog = () =>
  createSelector(
    selectServiceSelection,
    state => state.washLog,
  );

export { selectServiceSelection, selectBaseService, selectAddOns, selectWashLog };
