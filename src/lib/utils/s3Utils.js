import { s3Client } from "lib/set/s3Client";
import {
  PutObjectCommand,
  ListObjectsCommand,
  CopyObjectCommand,
} from "@aws-sdk/client-s3";

export const setUserObject = async ({ email, key }) => {
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    Key: `photo/${email}/${key}`,
  };
  const command = new PutObjectCommand(params);
  try {
    const data = await s3Client.send(command);
    return data.$metadata.httpStatusCode === 200;
  } catch (err) {
    throw Error(err.message);
  }
};

export const getUserObjectList = async ({ email }) => {
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/listobjectsv2request.html
    Prefix: `photo/${email}/`,
  };
  const command = new ListObjectsCommand(params);
  try {
    const data = await s3Client.send(command);
    return data;
  } catch (err) {
    throw Error(err.message);
  }
};

export const copyUserObjectList = async ({ email, newEmail }) => {
  const copyObjects = await getUserObjectList({ email });

  copyObjects.Contents.slice(1).forEach(async (object) => {
    const [key] = object.Key.split("/").slice(-1);
    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
      // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/copyobjectrequest.html
      CopySource: encodeURI(
        `${process.env.REACT_APP_S3_BUCKET_NAME}/${object.Key}`
      ),
      Key: `photo/${newEmail}/${key}`,
    };
    const command = new CopyObjectCommand(params);
    try {
      const data = await s3Client.send(command);
      return data;
    } catch (err) {
      throw Error(err.message);
    }
  });
};

export const uploadFiles = async ({ files, title, email }) => {
  const filesInfo = Promise.all(
    Object.values(files).map(async (file, index) => {
      const [fileType] = file.name.split(".").slice(-1);
      const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
        Key: `photo/${email}/${title}-${index}.${fileType}`,
        Body: file,
      };
      const command = new PutObjectCommand(params);
      try {
        const data = await s3Client.send(command);
        if (data.$metadata.httpStatusCode === 200) {
          return {
            name: `${title}-${index}`,
            url: `${process.env.REACT_APP_API_S3_ADDRESS}/photo/${email}/${title}-${index}.${fileType}`,
          };
        } else {
          return null;
        }
      } catch (err) {
        throw Error(err.message);
      }
    })
  );
  return await filesInfo;
};
