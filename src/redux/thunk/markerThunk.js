import { async } from "@firebase/util";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GeoPoint,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "lib/setFilrebase";

export const setMarker = createAsyncThunk(
  `marker/setMarker`,
  async ({ region, latitude, longitude }) => {
    // kakao map api내, keywordList이용 시 반환되는 place정보 중 address_name을 활용한다.
    // address_name : 행정도시, 시군구, 읍면동, 번지로만 표현된다

    const data = {
      point: new GeoPoint(parseFloat(latitude), parseFloat(longitude)),
      region: region,
    };

    const docRef = await addDoc(collection(db, "markers"), data);
    return docRef.id;
  }
);

export const getMarkerOne = createAsyncThunk(
  `marker/getMarkerOne`,
  async ({ id }) => {
    const markerCol = collection(db, "markers", id);
    const markerSnapshot = await getDocs(markerCol);

    const marker = markerSnapshot.docs.map((doc) => doc.data());
    return marker;
  }
);

export const getMarkerMatchRegion = createAsyncThunk(
  `marker/getMarkerMatchRegion`,
  async ({ region }) => {
    const markerCol = collection(db, "markers");
    const regionQuery = query(
      markerCol,
      where("region.district", "==", region)
    );
    const querySnapshot = await getDocs(regionQuery);
    const queryList = querySnapshot.docs.map((doc) => doc.data());
    return queryList;
  }
);

export const getMarkerAll = createAsyncThunk(
  `marker/getMarkerAll`,
  async () => {
    const markerCol = collection(db, "markers");
    const markerSnapshot = await getDocs(markerCol);
    const markerList = markerSnapshot.docs.map((doc) => doc.data());
    return markerList;
  }
);
