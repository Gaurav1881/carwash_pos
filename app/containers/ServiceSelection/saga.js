import { call, put, takeLatest } from 'redux-saga/effects';
import _isNumber from 'lodash/isNumber';
import _isEmpty from 'lodash/isEmpty';
import { ADD_TO_LOGS } from './constants';

import request from 'utils/request';

export function* attemptPushToDB(action) {

    const API_URL = `https://carwash-pos-backend.herokuapp.com`;
    // const API_URL = `http://localhost:8000`;

    const requestUrl = `${API_URL}/api/logs`;

    const log = action.payload;
    console.log(action.payload);
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
            'Cache': 'no-cache'
        };
        const result = yield call(request, requestUrl, options);
    } catch (err) {
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* logSaga() {
    yield takeLatest(ADD_TO_LOGS, attemptPushToDB);
}