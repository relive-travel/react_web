export const refClear = (refList) => {
  refList.forEach((ref) => ref.current && (ref.current.value = ""));
};

export const previewClear = ($preview) => {
  while ($preview.lastChild) {
    if ($preview.lastChild.tagName === "ARTICLE") {
      $preview.removeChild($preview.lastChild);
    } else {
      break;
    }
  }
};
