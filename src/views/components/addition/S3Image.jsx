function S3Image(props) {
  return (
    <img
      src={`${process.env.REACT_APP_S3_ADDRESS}/image/${props.folder}/${props.file}`}
    />
  );
}

export default S3Image;
