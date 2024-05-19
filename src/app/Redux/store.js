import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./slices/userSlice";
import { userServicesApi } from "../Services/userServices";
import { formServicesApi } from "../Services/formService";


export const store = configureStore({
    reducer: {
    user: userReducer,
    [userServicesApi.reducerPath]: userServicesApi.reducer,
    [formServicesApi.reducerPath]: formServicesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          userServicesApi.middleware,
          formServicesApi.middleware
        ),
});

export default store;
setupListeners(store.dispatch);