import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice.js";
import ProfileSlice from "./ProfileSlice.js";
import SocketSlice from "./SocketSlice.js";
import PostSlice from "./PostSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AllCoursesSlice from "./AllCoursesSlice.js";
import ManageSlice from './ManageSlice.js';
import { parse, stringify } from "flatted";
import createTransform from "redux-persist/es/createTransform";

const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState)
);


const persistConfig = {
  key: "root",
  storage,
  // transforms: [transformCircular],
};

// import ...Slice here
const reducer = combineReducers({
  auth: AuthSlice,
  profile: ProfileSlice,
  manage: ManageSlice,
  allCoursesList: AllCoursesSlice,
  post: PostSlice,
  socketInstance: SocketSlice,
  allCoursesList: AllCoursesSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
