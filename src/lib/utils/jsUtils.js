/** cookie */
export const setCookie = ({ name, value, expires }) => {
  let date = new Date();
  date.setTime(date.getTime() + expires * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

export const getCookie = ({ name }) => {
  let value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return value ? value[2] : null;
};

export const delCookie = ({ name }) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

/** localStorage */
export const setLocalStorage = ({ key, value }) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = ({ key }) => {
  return JSON.parse(localStorage.getItem(key));
};

export const delLocalStorage = ({ key }) => {
  localStorage.removeItem(key);
};

/** clear */
export const clearRef = (refList) => {
  refList.forEach((ref) => ref.current && (ref.current.value = ""));
};

export const clearPreview = ($preview) => {
  while ($preview.lastChild) {
    if ($preview.lastChild.tagName === "SECTION") {
      $preview.removeChild($preview.lastChild);
    } else {
      break;
    }
  }
};

/** inspect */
export const inspectRef = (ref) => {
  return ref?.current?.value && ref?.current?.value !== "";
};
export const inspectRefList = (refList) => {
  return refList.every(
    (ref) => ref?.current?.value && ref?.current?.value !== ""
  );
};
export const inspectRefFile = (refFile) => {
  return refFile?.current?.files?.length == 0;
};

/** filter */
export const childNodesFilter = ({ childNodes, keepType }) => {
  return Array.from(childNodes).filter((node) => node.tagName === keepType);
};

/** grouping */
export const groupSortType = ({ array, type }) => {
  return array.reduce((acc, cur) => {
    const dataType = type
      ? cur.marker.region.addr.replace(/[0-9]|\-/g, "").trim()
      : cur.album.date.split(" ").at(0);

    if (!acc[dataType]) acc[dataType] = [];
    acc[dataType].push(cur);
    return acc;
  }, {});
};

export const groupRegion = ({ array }) => {
  return array.reduce((acc, cur) => {
    const dataRegion = cur.marker.region.addr
      .replace(/[0-9]|\-/g, "")
      .trim()
      .split(" ");
    const distRegion = dataRegion.at(0);
    const semiRegion = dataRegion.slice(1, dataRegion.length).join(" ");

    if (!acc.hasOwnProperty(distRegion)) acc[distRegion] = {};
    if (!acc[distRegion].hasOwnProperty(semiRegion))
      acc[distRegion][semiRegion] = [];
    acc[distRegion][semiRegion].push(cur);

    return acc;
  }, {});
};
