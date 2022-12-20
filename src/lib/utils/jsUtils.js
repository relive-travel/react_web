/** clear */
export const clearRef = (refList) => {
  refList.forEach((ref) => ref.current && (ref.current.value = ""));
};

export const clearPreview = ($preview) => {
  while ($preview.lastChild) {
    if ($preview.lastChild.tagName === "ARTICLE") {
      $preview.removeChild($preview.lastChild);
    } else {
      break;
    }
  }
};

/** inspection */
export const inspectRef = (ref) => {
  return ref?.current?.value && ref?.current?.value == "";
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
export const groupDate = (array) => {
  return array.reduce((acc, cur) => {
    const dateType = cur.album.date.split(" ").at(0);
    if (!acc[dateType]) acc[dateType] = [];
    acc[dateType].push(cur);
    return acc;
  }, {});
};
