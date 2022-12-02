export const inspectRef = (refList) => {
  return refList.every(
    (ref) => ref?.current?.value && ref?.current?.value !== ""
  );
};
