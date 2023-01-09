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
          <section class="kakao-map-tooltip" style="margin-bottom: 9.625em;">
            <article class="kakao-map-title">${
              result[0].address.address_name
            }</article>
            ${
              result[0].road_address
                ? `<hr />
                <article class="kakao-map-content">${result[0].road_address.building_name}</article>`
                : ``
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

  const messageComponent = mapContainer.firstChild;

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
          <header class="place-${i}-index">${i + 1}</header>
          <main>
            <article class="place-name">${places[i].place_name}</article>
            <article class="place-addr">${places[i].address_name}</article>
            ${
              places[i].road_address_name
                ? `<article class="place-road-addr">${places[i].road_address_name}</article>`
                : ``
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
    mapContainer.appendChild(messageComponent);
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
    let position = new window.kakao.maps.LatLng(place.y, place.x);
    let mapOptions = {
      center: position,
      level: 2,
    };
    let map = new window.kakao.maps.Map(mapContainer, mapOptions);
    let customOverlay = new window.kakao.maps.CustomOverlay();

    let content = `
      <article class="place-tooltip" style="${
        place.road_address_name
          ? "margin-bottom: 11.25em;"
          : "margin-bottom: 9.25em;"
      }">
        <header class="place-title">${place.place_name}</header>
        <hr />
        <section class="place-content">
          <article class="place-addr">${place.address_name}</article>
          ${
            place.road_address_name
              ? `<article class="place-road-addr">${place.road_address_name}</article>`
              : ``
          }
        </section>
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

export const setKakaoMapWithRoad = ({ mapContainer, addr }, callback) => {
  let mapOptions = { center: new window.kakao.maps.LatLng(0, 0), level: 4 };
  let map = new window.kakao.maps.Map(mapContainer, mapOptions);
  let marker = new window.kakao.maps.Marker();
  let customOverlay = new window.kakao.maps.CustomOverlay();

  let geocoder = new window.kakao.maps.services.Geocoder();
  geocoder.addressSearch(addr, (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      let position = new window.kakao.maps.LatLng(
        parseFloat(result[0].y),
        parseFloat(result[0].x)
      );

      let content = `
        <section class="place-tooltip" style="${
          result[0].road_address?.building_name
            ? "margin-bottom: 10.875em;"
            : result[0].road_address
            ? "margin-bottom: 8.875em;"
            : "margin-bottom: 6.875em;"
        }">
          ${
            result[0].road_address?.building_name
              ? `<header class="place-title">${result[0].road_address.building_name}</header>
                <hr />`
              : ``
          }
          ${
            result[0].road_address
              ? `<section class="place-content">
                  <article class="place-addr">${result[0].address.address_name}</article>
                  <article class="place-road-addr">${result[0].road_address.address_name}</article>
                </section>`
              : `<article class="place-addr">${result[0].address.address_name}</article>`
          }
        </section>
      `;

      map.setCenter(position);

      marker.setPosition(position);
      marker.setMap(map);

      customOverlay.setPosition(position);
      customOverlay.setContent(content);
      customOverlay.setMap(map);
      callback(result[0]);
    }
  });
};

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
        let content = `
          <section class="place-tooltip" style="${
            result[0].road_address?.building_name
              ? "margin-bottom: 10.875em;"
              : result[0].road_address
              ? "margin-bottom: 8.875em;"
              : "margin-bottom: 6.875em;"
          }">
            ${
              result[0].road_address?.building_name
                ? `<header class="place-title">${result[0].road_address.building_name}</header>
                  <hr />`
                : ``
            }
            ${
              result[0].road_address
                ? `<section class="place-content">
                    <article class="place-addr">${result[0].address.address_name}</article>
                    <article class="place-road-addr">${result[0].road_address.address_name}</article>
                  </section>`
                : `<article class="place-addr">${result[0].address.address_name}</article>`
            }
          </section>
        `;

        marker.setPosition(mouseEvent.latLng);
        marker.setMap(map);

        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setContent(content);
        customOverlay.setMap(map);

        callback({
          latitude: mouseEvent.latLng.getLat(),
          longitude: mouseEvent.latLng.getLng(),
          ...result[0],
        });
      }
    });
  });
};
