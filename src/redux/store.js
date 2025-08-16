import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import carsReducer from './cars/slice';

const persistedCarsReducer = persistReducer(
  {
    key: 'favorite',
    storage,
    whitelist: ['favoriteCars'],
  },
  carsReducer
);

export const store = configureStore({
  reducer: {
    cars: persistedCarsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
