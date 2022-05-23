import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboardState = state => state.DashboardPage || initialState;

const selectLogs = () =>
  createSelector(
    selectDashboardState,
    state => state.logs,
  );

export { selectDashboardState, selectLogs };
