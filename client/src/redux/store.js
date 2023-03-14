import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice.js';
import ProfileSlice from './ProfileSlice.js';
import SocketSlice from './SocketSlice.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AllCoursesSlice from './AllCoursesSlice.js';
import ManageSlice from './ManageSlice.js';

const persistConfig = {
  key: 'root',
  storage,
}

// import ...Slice here
const reducer = combineReducers({
  auth: AuthSlice,
  profile: ProfileSlice,
  manage: ManageSlice,
  allCoursesList: AllCoursesSlice,
  socketInstance: SocketSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)