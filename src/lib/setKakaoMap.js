export const setKakaoMap = ({ type, latitude, longitude }) => {
  //지도를 담을 영역의 DOM 레퍼런스
  var mapContainer = document.querySelector(".kakao-map-auto");

  //지도를 생성할 때 필요한 기본 옵션
  var mapOptions = {
    //지도의 중심좌표.
    center: new window.kakao.maps.LatLng(latitude, longitude),
    //지도의 레벨(확대, 축소 정도)
    level: 4,
  };
  //지도 생성 및 객체 리턴
  var map = new window.kakao.maps.Map(mapContainer, mapOptions);
  switch (type) {
    case "geoPoint":
      geoPointSearch(map, latitude, longitude);
      break;
    case "keyword":
      break;
    case "road":
      break;
    case "location":
      break;
    default:
      break;
  }
};

export const geoPointSearch = (map, latitude, longitude) => {
  var geocoder = new window.kakao.maps.services.Geocoder();

  var marker = new window.kakao.maps.Marker();
  var infowindow = new window.kakao.maps.InfoWindow({
    zindex: 1,
  });

  const searchDetailAddrFromCoords = (geoPoint, callback) => {
    geocoder.coord2Address(geoPoint.longitude, geoPoint.latitude, callback);
  };

  searchDetailAddrFromCoords({ latitude, longitude }, (result, status) => {
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
    }
  });
};

export const keywordSearch = (map, latitude, longitude) => {};

export const roadSearch = (map, latitude, longitude) => {};

export const locationSelect = (map, latitude, longitude) => {};
