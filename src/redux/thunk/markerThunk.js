import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GeoPoint,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "lib/set/filrebase";

export const setMarker = createAsyncThunk(
  `marker/setMarker`,
  async ({ userId, region, latitude, longitude }) => {
    // kakao map api내, keywordList이용 시 반환되는 place정보 중 address_name을 활용한다.
    // address_name : 행정도시, 시군구, 읍면동, 번지로만 표현된다

    const data = {
      userId,
      point: new GeoPoint(parseFloat(latitude), parseFloat(longitude)),
      region,
    };

    const docRef = await addDoc(collection(db, "markers"), data);
    return docRef.id;
  }
);

export const getMarker = createAsyncThunk(
  `marker/getMarker`,
  async ({ id }) => {
    const markerCol = doc(db, "markers", id);
    const markerSnapshot = await getDoc(markerCol);

    const markerId = markerSnapshot.id;
    const markerItem = markerSnapshot.data();

    return {
      id: markerId,
      ...markerItem,
    };
  }
);

export const getMarkerAll = createAsyncThunk(
  `marker/getMarkerAll`,
  async ({ userId }) => {
    const markerCol = collection(db, "markers");
    const markerQuery = query(markerCol, where("userId", "==", userId));

    const querySnapshot = await getDocs(markerQuery);
    const queryList = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return queryList;
  }
);

export const getMarkerAllMatchRegion = createAsyncThunk(
  `marker/getMarkerAllMatchRegion`,
  async ({ userId, region }) => {
    const markerCol = collection(db, "markers");
    const regionQuery = query(
      markerCol,
      where("userId", "==", userId),
      where("region.district", "==", region)
    );
    const querySnapshot = await getDocs(regionQuery);
    const queryList = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return queryList;
  }
);
