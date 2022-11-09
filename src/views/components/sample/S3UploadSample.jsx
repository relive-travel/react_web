import { useRef, useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function S3UploadSample(props) {
  const [selectFile, setSelectFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectFile(e.target.files);
  };

  const handleUpload = async (file) => {
    const client = new S3Client({
      region: process.env.REACT_APP_S3_REGION,
      credentials: {
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
      },
    });

    // one file

    // const params = {
    //   Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    //   Key: file.name,
    //   Body: file,
    // };

    // const command = new PutObjectCommand(params);
    // const data = await client.send(command);
    // console.log(data);

    // multi file
    Object.values(selectFile).map(async (val) => {
      const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
        Key: val.name,
        Body: val,
      };
      console.log(params);

      const command = new PutObjectCommand(params);
      try {
        const data = await client.send(command);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <div>
      {/* <input type="file" onChange={handleFileInput} multiple></input> */}
      <input
        type="file"
        onChange={handleFileInput}
        accept="file_extension|audio/*|video/*|Image/*|media_type"
        multiple
      ></input>
      <button onClick={() => handleUpload(selectFile)}>Upload To S3</button>
    </div>
  );
}

export default S3UploadSample;
