import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {rootReducer} from './Redux/rootReducer'
import './index.css';
import App from './App';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f=>f));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />    
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

