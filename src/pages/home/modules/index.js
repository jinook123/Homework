// redux
import { combineReducers } from 'redux';

// saga
import { all } from 'redux-saga/effects';

import { listReducer, listSaga } from 'pages/home/modules/search';

export function* homeSaga() {
    yield all([listSaga()]);
}

export const homeReducer = combineReducers({
    listReducer,
});
