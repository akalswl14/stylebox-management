import React from "react";
import WrapPage from "../../Styles/WrapPageStyles";
import AWS, { Credentials } from "aws-sdk";

const access = new Credentials({
  accessKeyId: process.env.REACT_APP_IAM_ID,
  secretAccessKey: process.env.REACT_APP_IAM_SECRETKEY,
});

const s3 = new AWS.S3({
  credentials: access,
  region: process.env.S3_REGION,
});

const signedUrlExpireSeconds = 60 * 15;

const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;

const ImageUpload = () => {
  const fileInput = React.createRef();
  console.log("처음");
  console.log(fileInput);

  const uploadVideo = async (e) => {
    e.preventDefault();
    console.log("끝");
    console.log(fileInput);

    const file = fileInput.current.files[0];
    const fileName = file.name;

    const preSignedUrl = await getPreSignedUrl(fileName);
    uploadToBucket(preSignedUrl, file);
  };

  const onChange = (e) => {
    e.preventDefault();
    console.log("중간");
    console.log(fileInput);
  };

  return (
    <WrapPage>
      <form onSubmit={uploadVideo}>
        <input type="file" ref={fileInput} onChange={onChange} />
        <input type="submit" />
      </form>
    </WrapPage>
  );
};

const getPreSignedUrl = async (fileName) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: "PostExample/" + fileName,
    ContentType: "image/*",
    ACL: "public-read",
    Expires: signedUrlExpireSeconds,
    // meta: {
    //   key: "12345",
    //   otherInfo: "other_data",
    // },
  };
  const url = s3.getSignedUrl("putObject", params);
  console.log("This is a presigned Url! : ", url);
  return url;
};

const uploadToBucket = async (preSignedUrl, file) => {
  const option = {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": "image/*",
      "x-amz-acl": "public-read",
      // "x-amz-meta-key": "12345",
      // "x-amz-meta-otherInfo": "other_data",
    },
  };

  await fetch(preSignedUrl, option);
};

export default ImageUpload;
