import "./PathElements.scss";
function PathElements(props) {
  const { name, pathData } = props;

  return (
    <path
      className="path"
      data-name={name}
      d={pathData}
      onClick={props.onClick}
    ></path>
  );
}

export default PathElements;
