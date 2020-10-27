import AWS from "aws-sdk";
import { IAM_ID, IAM_SECRETKEY, BUCKET_NAME } from "../../AWS_IAM";
const s3 = new AWS.S3({
  accessKeyId: IAM_ID,
  secretAccessKey: IAM_SECRETKEY,
});

export const getPresignedUrl = ({ Key }) => {
  const params = { Bucket: BUCKET_NAME, Key };
  const url = s3.getSignedUrl("getObject", params);
  console.log("This is a presigned Url! : ", url);
  return url;
};
