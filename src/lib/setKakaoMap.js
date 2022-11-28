export const setKakaoMapWithGeoPoint = ({
  mapContainer,
  latitude,
  longitude,
}) => {
  let mapOptions = {
    center: new window.kakao.maps.LatLng(latitude, longitude),
    level: 4,
  };
  let map = new window.kakao.maps.Map(mapContainer, mapOptions);
  let marker = new window.kakao.maps.Marker();
  let geocoder = new window.kakao.maps.services.Geocoder();
  let customOverlay = new window.kakao.maps.CustomOverlay();

  return new Promise((resolve) => {
    geocoder.coord2Address(longitude, latitude, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let content = `
          <section class="place-addr" style="margin-bottom: 10.875em;">
            ${
              result[0].road_address
                ? `<header class="place-name">${result[0].road_address.building_name}</header>
                  <hr />
                  <section class="place-road-addr-name">${result[0].road_address.address_name}</section>`
                : `<section class="place-addr-name">${result[0].address.address_name}</section>`
            }
          </section>`;

        marker.setPosition(new window.kakao.maps.LatLng(latitude, longitude));
        marker.setMap(map);

        customOverlay.setPosition(
          new window.kakao.maps.LatLng(latitude, longitude)
        );
        customOverlay.setContent(content);
        customOverlay.setMap(map);

        resolve(result[0]);
      }
    });
  });
};

export const setKakaoMapWithKeyword = (
  { mapContainer, listContainer, pageContainer, keyword },
  callback
) => {
  let message;
  let ps = new window.kakao.maps.services.Places();

  const searchPlaces = () => {
    removeMapChild();

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
      const $section = document.createElement("section");
      const $checkbox = document.createElement("input");
      $checkbox.type = "checkbox";
      $checkbox.id = `place-${i}`;
      $checkbox.addEventListener("click", (e) => {
        document
          .querySelectorAll("input[type=checkbox]")
          .forEach((el) => (el.checked = false));
        e.target.checked = true;
        addMarker(places[i], i);
        callback(places[i]);
      });
      const $label = document.createElement("label");
      $label.setAttribute("for", `place-${i}`);

      $label.innerHTML = `
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

      $section.appendChild($checkbox);
      $section.appendChild($label);
      listContainer.appendChild($section);
    }
  };
  const displayPagination = (pagination) => {
    removePageChild();
    let $fragment = document.createDocumentFragment();

    let $prevButton = document.createElement("button");
    $prevButton.className = "arrow";
    $prevButton.innerHTML = `<<`;
    $prevButton.addEventListener("click", () => {
      removeMapChild();
      pagination.gotoFirst();
    });
    $fragment.appendChild($prevButton);

    for (let i = 1; i <= pagination.last; i++) {
      let $button = document.createElement("button");
      $button.innerHTML = i;

      if (i === pagination.current) {
        $button.className = "on";
      } else {
        $button.addEventListener("click", () => {
          removeMapChild();
          pagination.gotoPage(i);
        });
      }
      $fragment.appendChild($button);
    }

    let $nextButton = document.createElement("button");
    $nextButton.className = "arrow";
    $nextButton.innerHTML = `>>`;
    $nextButton.addEventListener("click", () => {
      removeMapChild();
      pagination.gotoLast();
    });
    $fragment.appendChild($nextButton);

    pageContainer.appendChild($fragment);
  };
  const removeMapChild = () => {
    mapContainer.removeAttribute("style");
    while (mapContainer.firstChild) {
      mapContainer.removeChild(mapContainer.firstChild);
    }
  };
  const removeListChild = () => {
    while (listContainer.firstChild) {
      listContainer.removeChild(listContainer.firstChild);
    }
  };
  const removePageChild = () => {
    while (pageContainer.firstChild) {
      pageContainer.removeChild(pageContainer.firstChild);
    }
  };
  const addMarker = (place, idx) => {
    console.log(place);
    let position = new window.kakao.maps.LatLng(place.y, place.x);
    let mapOptions = {
      center: position,
      level: 3,
    };
    let map = new window.kakao.maps.Map(mapContainer, mapOptions);
    let customOverlay = new window.kakao.maps.CustomOverlay();

    let content = `
      <article class="place-addr" style="margin-bottom: 12em;">
        <header class="place-name">${place.place_name}</header>
        <hr />
        <section class="place-road-addr-name">도로명주소 : ${place.address_name}</section>
        <section class="place-addr-name">지번&nbsp;&nbsp;&nbsp;주소 : ${place.road_address_name}</section>
      </article>
    `;
    customOverlay.setPosition(position);
    customOverlay.setContent(content);
    customOverlay.setMap(map);

    let bounds = new window.kakao.maps.LatLngBounds();
    bounds.extend(position);
    map.setBounds(bounds);

    let imgSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    let imgSize = new window.kakao.maps.Size(36, 37);
    let imgOptions = {
      spriteSize: new window.kakao.maps.Size(36, 691),
      spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
      offset: new window.kakao.maps.Point(14, 37),
    };
    let markerImg = new window.kakao.maps.MarkerImage(
      imgSrc,
      imgSize,
      imgOptions
    );
    let marker = new window.kakao.maps.Marker({
      position,
      image: markerImg,
    });

    marker.setMap(map);
  };
  searchPlaces();
};

export const setKakaoMapWithRoad = (map, latitude, longitude) => {};

export const setKakaoMapWithLocation = (
  { mapContainer, latitude, longitude },
  callback
) => {
  let mapOption = {
    center: new window.kakao.maps.LatLng(latitude, longitude),
    level: 3,
  };
  let map = new window.kakao.maps.Map(mapContainer, mapOption);
  let marker = new window.kakao.maps.Marker();
  let geocoder = new window.kakao.maps.services.Geocoder();
  let customOverlay = new window.kakao.maps.CustomOverlay();

  const searchDetailAddrFromCoords = (coords, callback) => {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  };

  window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
    searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let detailAddr = `
          ${
            result[0].road_address
              ? `<section class="place-road-addr-name">도로명주소 : ${result[0].road_address.address_name}</section>
                <section class="place-addr-name">지번&nbsp;&nbsp;&nbsp;주소 : ${result[0].address.address_name}</section>`
              : `<section class="place-addr-name">지번&nbsp;&nbsp;&nbsp;주소 : ${result[0].address.address_name}</section>`
          }
        `;
        let content = `
          <article class="place-addr" style="${
            result[0].road_address
              ? "margin-bottom: 12em;"
              : "margin-bottom: 10.875em;"
          }">
            <header class="place-title">법정동 주소정보</header>
            ${detailAddr}
          </article>
        `;

        marker.setPosition(mouseEvent.latLng);
        marker.setMap(map);

        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setContent(content);
        customOverlay.setMap(map);
        callback(result[0]);
      }
    });
  });
};
