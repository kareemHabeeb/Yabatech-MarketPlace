import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/es/storage";

import { userReducer, staffReducer } from "./userSlice";

/*
========================================
USER PERSIST CONFIG
========================================
*/

const persistConfig = {
  key: "user",
  storage,
};

/*
========================================
STAFF PERSIST CONFIG
========================================
*/

const persistConfigStaff = {
  key: "staff",
  storage,
};

/*
========================================
PERSISTED REDUCERS
========================================
*/

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const persistedStaffReducer = persistReducer(persistConfigStaff, staffReducer);

/*
========================================
REDUX STORE
========================================
*/

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    staff: persistedStaffReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/*
========================================
PERSISTOR
========================================
*/

export const persistor = persistStore(store);
