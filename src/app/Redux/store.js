import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./slices/userSlice";
import { userServicesApi } from "../Services/userServices";


export const store = configureStore({
    reducer: {
    user: userReducer,
    [userServicesApi.reducerPath]: userServicesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          userServicesApi.middleware
        ),
});

export default store;
setupListeners(store.dispatch);