import { configureStore } from "@reduxjs/toolkit";
// import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";
import userReducer from "./slice/userSlice";
import mapReducer from "./slice/mapSlice";
import markerReducer from "./slice/markerSlice";
import albumReducer from "./slice/albumSlice";
import photoReducer from "./slice/photoSlice";
import statusReducer from "./slice/statusSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    map: mapReducer,
    marker: markerReducer,
    album: albumReducer,
    photo: photoReducer,
    status: statusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // // Ignore these action types
        // ignoredActions: ['your/action/type'],
        ignoreActions: ["marker/getMarkerAll"],
        // // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // // Ignore these paths in the state
        ignoredPaths: [
          "marker.list", // has [geoPoint]
          "album.data", // has [geoPoint] in album.data.marker
          "photo.file", // has [file]
          "photo.data", // has [exif]
          "photo.gather", // has [geoPoint] in marker of entries values
        ],
      },
    }),
});
