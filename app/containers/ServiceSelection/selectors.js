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

export { selectServiceSelection, selectBaseService, selectAddOns };
