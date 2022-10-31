import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";
import mapReducer from "./slice/mapSlice";

export const store = configureStore({
  reducer: { map: mapReducer },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(logger).concat(composeWithDevTools),
});
