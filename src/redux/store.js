import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";
import mapReducer from "./slice/mapSlice";
import markerReducer from "./slice/markerSlice";

export const store = configureStore({
  reducer: { map: mapReducer, marker: markerReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // // Ignore these action types
        // ignoredActions: ['your/action/type'],
        ignoreActions: ["marker/getMarkerAll"],
        // // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // // Ignore these paths in the state
        ignoredPaths: ["marker.list"],
      },
    }),
});
