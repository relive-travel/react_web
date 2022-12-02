import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({
  region: process.env.REACT_APP_S3_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  },
});
