import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from 'store/loading';
import paneActive from 'store/paneActive';

import { persistReducer } from 'redux-persist'; //redux persist 새로고침시 redux store초기화문제 해결
// import storage from 'redux-persist/lib/storage'; //local storage사용시
import storageSession from 'redux-persist/lib/storage/session'; //session storage사용시

//홈 공통
import { homeReducer, homeSaga } from 'pages/home/modules';

const persistConfig = {
    key: 'root',
    // sessionStorage에 저장합니다. //local은 storage: storage없이 storage만써도 가능
    storage: storageSession,
    // reducer 중에 auth reducer만 localstorage에 저장합니다.
    whitelist: ['loginReducer'],
    // blacklist -> 그것만 제외합니다
};

export const rootReducer = combineReducers({
    // 공통
    paneActive,
    loading,

    //홈 공통(마이메뉴)
    homeReducer,

});

export function* rootSaga() {
    yield all([
        homeSaga(),
    ]);
}

export default persistReducer(persistConfig, rootReducer);
