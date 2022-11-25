export const setKakaoMapWithGeoPoint = ({
  mapContainer,
  latitude,
  longitude,
}) => {
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

export const setKakaoMapWithKeyword = ({
  mapContainer,
  listContainer,
  pageContainer,
  keyword,
}) => {
  console.log(keyword);
  var message;
  var ps = new window.kakao.maps.services.Places();

  const searchPlaces = () => {
    if (!keyword.replace(/^\s+|\s+$/g, "")) return false;
    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        displayPlaces(data);
        displayPagination(pagination);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        message = "검색 결과가 존재하지 않습니다.";
        return;
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        message = "검색 결과 중 오류가 발생했습니다.";
        return;
      }
    });
  };
  const displayPlaces = (places) => {
    removeListChild();

    for (let i = 0; i < places.length; i++) {
      const $article = document.createElement("article");
      const $button = document.createElement("button");

      $article.innerHTML = `
          <header class="place-${i}">${i + 1}</header>
          <main>
            <section class="place-name">${places[i].place_name}</section>
            ${
              places[i].road_address_name
                ? `<section class="place-road-addr-name">${places[i].road_address_name}</section>
                <section class="place-addr-name">${places[i].address_name}</section>`
                : `<section class="place-addr-name">${places[i].address_name}</section>`
            }
            </main>
        `;
      $button.innerHTML = "보기";

      $button.addEventListener("click", () => {
        addMarker(new window.kakao.maps.LatLng(places[i].y, places[i].x), i);
      });

      $article.appendChild($button);
      listContainer.appendChild($article);
    }
  };
  const displayPagination = (pagination) => {
    console.log(pagination);
  };
  const removeListChild = () => {
    while (listContainer.firstChild) {
      if (listContainer.firstChild.tagName === "ARTICLE") {
        listContainer.removeChild(listContainer.firstChild);
      } else {
        break;
      }
    }
  };
  const addMarker = (position, idx) => {
    var mapOptions = {
      center: position,
      level: 4,
    };
    var map = new window.kakao.maps.Map(mapContainer, mapOptions);

    var bounds = new window.kakao.maps.LatLngBounds();
    bounds.extend(position);
    map.setBounds(bounds);

    var imgSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    var imgSize = new window.kakao.maps.Size(36, 37);
    var imgOptions = {
      spriteSize: new window.kakao.maps.Size(36, 691),
      spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
      offset: new window.kakao.maps.Point(13, 37),
    };

    var markerImg = new window.kakao.maps.MarkerImage(
      imgSrc,
      imgSize,
      imgOptions
    );
    var marker = new window.kakao.maps.Marker({
      position,
      image: markerImg,
    });

    marker.setMap(map);
  };

  searchPlaces();
};

export const setKakaoMapWithRoad = (map, latitude, longitude) => {};

export const setKakaoMapWithLocation = (map, latitude, longitude) => {};
