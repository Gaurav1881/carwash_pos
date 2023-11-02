import moment from 'moment';

import { call, put, takeLatest } from 'redux-saga/effects';
import _isNumber from 'lodash/isNumber';
import _isEmpty from 'lodash/isEmpty';
import { GET_LOGS } from './constants';

import request from 'utils/request';
import { setServiceLogs } from './actions';

function compareLogGroups(a, b) {
    const a_date = new Date(a.date).getTime();
    const b_date = new Date(b.date).getTime();

    if (a_date < b_date) {
        return -1;
    }
    if (b_date > a_date) {
        return 1;
    }
    return 0;
}

export function* attemptGetLogs(action) {
    let date = moment().format('YYYY-MM-DD');

    const API_URL = `https://carwash-pos-backend.herokuapp.com`;

    // const API_URL = `http://localhost:8000`;

    const requestUrl = `${API_URL}/api/logs?date=` + encodeURIComponent(date);

    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            'Cache': 'no-cache'
        };
        let result = yield call(request, requestUrl, options);

        result.sort(compareLogGroups);

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