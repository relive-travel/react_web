import { client } from "lib/set/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

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
        const data = await client.send(command);
        if (data.$metadata.httpStatusCode === 200) {
          return {
            name: `${title}-${index}`,
            url: `${process.env.REACT_APP_API_S3_ADDRESS}/photo/${email}/${title}-${index}.${fileType}`,
          };
        } else {
          return null;
        }
      } catch (e) {
        throw Error(e.message);
      }
    })
  );
  return await filesInfo;
};
