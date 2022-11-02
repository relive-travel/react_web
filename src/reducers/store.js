import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";
import mapReducer from "./slice/mapSlice";
import markerReducer from "./slice/markerSlice";

export const store = configureStore({
  reducer: { map: mapReducer, marker: markerReducer },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(logger).concat(composeWithDevTools),
});
