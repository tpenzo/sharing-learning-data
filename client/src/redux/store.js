import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice.js';
import ProfileSlice from './ProfileSlice.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

// import ...Slice here
const reducer = combineReducers({
  auth: AuthSlice,
  profile: ProfileSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)