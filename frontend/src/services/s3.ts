import AWS from 'aws-sdk';

export const s3 = new AWS.S3({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION,
});

export const bucketName = import.meta.env.VITE_BUCKET_NAME;
