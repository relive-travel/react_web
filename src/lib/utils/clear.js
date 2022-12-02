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
