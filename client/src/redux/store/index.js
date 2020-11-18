import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../reducers/auth.reducer';
import { musicReducer } from '../reducers/music.reducer';
import { artistReducer } from '../reducers/artist.reducer';
import { episodeReducer } from '../reducers/episode.reducer';
import { transactionReducer } from '../reducers/transaction.reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import promise from 'redux-promise-middleware';
import createFilter from 'redux-persist-transform-filter';

const saveSubsetFilter = createFilter('authReducer', ['isLogin', 'user']);

const persistConfig = {
  key: 'authReducer',
  storage: storage,
  whitelist: ['authReducer'],
  transforms: [saveSubsetFilter],
};

const reducers = combineReducers({
  authReducer,
  musicReducer,
  episodeReducer,
  artistReducer,
  transactionReducer,
});

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistReducer(persistConfig, reducers),
  storeEnhancers(applyMiddleware(promise))
);

export const persistor = persistStore(store);
