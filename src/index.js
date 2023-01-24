// ie11
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

// import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import rootStore, { persistor } from 'store/store';
import { PersistGate } from 'redux-persist/integration/react';

import { isIE } from 'react-device-detect';

ReactDOM.render(
    <Provider store={rootStore}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);
