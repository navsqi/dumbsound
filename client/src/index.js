import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loader from 'react-loader-spinner';

import { store, persistor } from './redux/store/index';
import './index.css';

import Router from './routes';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: '30vh',
          }}
        >
          <Loader type="BallTriangle" color="#cf00dd" height="200" width="200" stye="" />
        </div>
      }
      persistor={persistor}
      onBeforeLift={() => new Promise((resolve) => setTimeout(resolve, 1000))}
    >
      <Router />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
