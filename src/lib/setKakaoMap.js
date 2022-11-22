export const setKakaoMapWithGeoPoint = ({ latitude, longitude }) => {
  var mapContainer = document.querySelector(".kakao-map-auto");
  var mapOptions = {
    center: new window.kakao.maps.LatLng(latitude, longitude),
    level: 4,
  };
  var map = new window.kakao.maps.Map(mapContainer, mapOptions);

  var geocoder = new window.kakao.maps.services.Geocoder();

  var marker = new window.kakao.maps.Marker();

  var infowindow = new window.kakao.maps.InfoWindow({
    zindex: 1,
  });

  return new Promise((resolve) => {
    geocoder.coord2Address(longitude, latitude, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        var roadAddr = !!result[0].road_address
          ? `<div>${result[0].road_address.building_name}</div>`
          : "";
        var addr = !!result[0].road_address
          ? `<div>${result[0].road_address.address_name}</div>`
          : `<div>${result[0].address.address_name}</div>`;
        var content = `
          <div class="marker-infowindow" style="padding: 0.5em;">
            <div class="title">${roadAddr}</div>
            <div class="addr" style="font-size: 0.625em;">${addr}</div>
          </div>`;

        marker.setPosition(new window.kakao.maps.LatLng(latitude, longitude));
        marker.setMap(map);

        infowindow.setContent(content);
        infowindow.open(map, marker);

        resolve(result[0]);
      }
    });
  });
};

export const setKakaoMapWithKeyword = (map, latitude, longitude) => {};

export const setKakaoMapWithRoad = (map, latitude, longitude) => {};

export const setKakaoMapWithLocation = (map, latitude, longitude) => {};
