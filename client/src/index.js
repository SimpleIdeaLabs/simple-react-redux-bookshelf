import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import reducers from './reducers';

const storeWithMiddlewares = applyMiddleware(
  promiseMiddleware,
  thunkMiddleware
)(createStore);

ReactDOM.render(
  <Provider store={storeWithMiddlewares(reducers)}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
