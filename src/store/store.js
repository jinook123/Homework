import { createStore, applyMiddleware } from 'redux';

import persistReducer, { rootReducer, rootSaga } from 'store';

import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

//persist store사용
import { persistStore } from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const env = process.env.NODE_ENV; 

let middlewares = [];
if (env == 'development') {
    middlewares.push(logger);
} else if (env == 'production') {
    console.log('상용');
} else {
    middlewares.push(logger);
}

// const rootStore = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));
// const rootStore = createStore(rootReducer, applyMiddleware(...middlewares, sagaMiddleware));
const rootStore = createStore(persistReducer, applyMiddleware(...middlewares, sagaMiddleware));
export const persistor = persistStore(rootStore);

sagaMiddleware.run(rootSaga);

export default rootStore;
