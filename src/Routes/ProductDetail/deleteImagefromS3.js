import { IAM_ID, IAM_SECRETKEY, BUCKET_NAME, S3_REGION } from "../../AWS_IAM";
import AWS, { Credentials } from "aws-sdk";

const access = new Credentials({
  accessKeyId: IAM_ID,
  secretAccessKey: IAM_SECRETKEY,
});

const s3 = new AWS.S3({
  credentials: access,
  region: S3_REGION,
});

const rtnKeyList = (keys) => {
  let rtnDeleteKeys = [];
  for (const eachKey of keys) {
    rtnDeleteKeys.push({ Key: eachKey });
  }
  return rtnDeleteKeys;
};

export default async ({ keys }) => {
  try {
    let DeleteResult;
    if (keys.length === 0) return { data: true, error: false };
    const Objects = rtnKeyList(keys);
    var params = {
      Bucket: BUCKET_NAME,
      Delete: {
        Objects,
      },
    };
    await s3.deleteObjects(params, function (err, data) {
      if (err) DeleteResult = { data: false, error: err };
      else DeleteResult = { data, error: false };
    });
    return DeleteResult;
  } catch (e) {
    return { data: false, error: e };
  }
};
