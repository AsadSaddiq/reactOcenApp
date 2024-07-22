import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slices/PropertySlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    property: propertyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
