export const childNodesFilter = ({ childNodes, keepType }) => {
  return Array.from(childNodes).filter((node) => node.tagName === keepType);
};
