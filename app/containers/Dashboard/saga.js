import moment from 'moment';

import { call, put, takeLatest } from 'redux-saga/effects';
import _isNumber from 'lodash/isNumber';
import _isEmpty from 'lodash/isEmpty';
import request from 'utils/request';
import { GET_LOGS } from './constants';

import { setServiceLogs } from './actions';

export function* attemptGetLogs(action) {
  const date = moment().format('YYYY-MM-DD');

  const { API_URL } = process.env;

  const requestUrl = `${API_URL}/api/logs?date=${encodeURIComponent(date)}`;

  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      Cache: 'no-cache',
    };
    const result = yield call(request, requestUrl, options);

    results = results.sort((a, b) => {
      moment(a.date, 'YYYY-MM-DD').isAfter(moment(b.date, 'YYYY-MM-DD'));
    });

    console.log(result);
    yield put(setServiceLogs(result));
  } catch (err) {
    console.log(err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* logSaga() {
  yield takeLatest(GET_LOGS, attemptGetLogs);
}
