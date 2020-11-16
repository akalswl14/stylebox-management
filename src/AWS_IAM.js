export const IAM_ID = String(process.env.REACT_APP_IAM_ID);
export const IAM_SECRETKEY = String(process.env.REACT_APP_IAM_SECRETKEY);
export const BUCKET_NAME = String(process.env.REACT_APP_BUCKET_NAME);
export const S3_REGION = String(process.env.REACT_APP_S3_REGION);
export const S3_URL =
  "https://" + BUCKET_NAME + ".s3-" + S3_REGION + ".amazonaws.com/";
export const API_SERVER = String(process.env.REACT_APP_API_SERVER);
