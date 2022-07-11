import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from "redux";
import reduxThunk from 'redux-thunk';

import App from "./App";
import reducers from './redux/reducers/index';

// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
)