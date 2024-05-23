import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import { userServicesApi } from "../Services/userServices";
import { formServicesApi } from "../Services/formService";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    [userServicesApi.reducerPath]: userServicesApi.reducer,
    [formServicesApi.reducerPath]: formServicesApi.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userServicesApi.middleware,
      formServicesApi.middleware
    ),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
