import { call, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { ADD_TO_LOGS } from './constants';

export function* attemptPushToDB(action) {
  const API_URL = `https://carwash-pos-backend.herokuapp.com`;
  // const API_URL = `http://localhost:8000`;

  const requestUrl = `${API_URL}/api/logs`;

  const {
    baseService,
    addOns = [],
    paymentMethod = 'unspecified',
    isDeposit = false,
    depositLog,
  } = action.payload || {};

  let log;
  if (isDeposit && depositLog) {
    log = { ...depositLog, date: new Date() };
  } else {
    log = {
      ...(baseService || {}),
      addOns: (addOns || []).filter(a => a.quantity > 0),
      paymentMethod,
      date: new Date(),
    };
  }

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        log,
      }),
      mode: 'cors',
      Cache: 'no-cache',
    };
    yield call(request, requestUrl, options);
  } catch (err) {
    // swallow network errors; log persistence is best-effort
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* logSaga() {
  yield takeLatest(ADD_TO_LOGS, attemptPushToDB);
}
