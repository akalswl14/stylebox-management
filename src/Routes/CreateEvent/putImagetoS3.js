import { IAM_ID, IAM_SECRETKEY, BUCKET_NAME, S3_REGION } from "../../AWS_IAM";
import AWS, { Credentials } from "aws-sdk";

const access = new Credentials({
  accessKeyId: IAM_ID,
  secretAccessKey: IAM_SECRETKEY,
});

const s3 = new AWS.S3({
  credentials: access,
});

const signedUrlExpireSeconds = 60 * 5;

const getPreSignedUrl = async (fileName, fileType) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    ContentType: "image/" + fileType,
    ACL: "public-read",
    Expires: signedUrlExpireSeconds,
  };
  const url = s3.getSignedUrl("putObject", params);
  return url;
};

const uploadToBucket = async (preSignedUrl, file, fileType) => {
  const option = {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": "image/" + fileType,
      "x-amz-acl": "public-read",
    },
  };
  let rtn = await fetch(preSignedUrl, option);
  return;
};

export default async ({ file, fileName }) => {
  try {
    const fileType = file.type.substring(6);
    const preSignedUrl = await getPreSignedUrl(fileName, fileType);
    await uploadToBucket(preSignedUrl, file, fileType);
    return { data: true, error: false };
  } catch (e) {
    return { data: false, error: e };
  }
};
