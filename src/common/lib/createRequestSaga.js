import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from 'store/loading';
import callApiByMethod from 'common/lib/callApiByMethod';
import React from 'react';

// export default function createRequestSaga(type, action, url, method = 'get') {
const createRequestSaga = (type, url, method = 'get', loading, config) => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function* (action) {
        if (loading === true) {
            yield put(startLoading(type)); // 로딩 시작
        }
        try {
            // console.log(action);
            const result = yield call(callApiByMethod, {
                url: url,
                method: method,
                data: action.payload,
                type: type,
                ...config,
            });
            
            if(result.isSuccess === false){
                yield put({
                    type: FAILURE,
                    payload: result,
                    error: true,
                });
            } else {
                yield put({ type: SUCCESS, payload: result });
            }
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        if (loading === true) {
            yield put(finishLoading(type)); // 로딩 끝
        }
    };
};

export default createRequestSaga;
