import "./PathElements.scss";
function PathElements(props) {
  const { path } = props;
  return <path className="path" d={path}></path>;
}

export default PathElements;
