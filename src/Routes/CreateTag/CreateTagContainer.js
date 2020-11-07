import React, { useReducer } from "react";
import CreateTagPresenter from "./CreateTagPresenter";
import { useMutation } from "react-apollo-hooks";
import { CREATE_TAG } from "./CreateTagQueries";
import { toast } from "react-toastify";
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

export const TagInfoContext = React.createContext(null);

const initialState = {
  tagInfo: {
    tagImage: "",
    tagName: "",
    category: "",
    classId: 0,
  },
  tagLogoFile: "",
  tagLogoPreviewUrl: "",
  imageInput: { current: null },
};

function reducer(state, action) {
  switch (action.type) {
    case "TAGINFO_CHANGE":
      const { name, value } = action.data;
      if (name === "classId") {
        return {
          ...state,
          tagInfo: {
            ...state.tagInfo,
            [name]: Number(value),
          },
        };
      } else if (name === "category") {
        return {
          ...state,
          tagInfo: {
            ...state.tagInfo,
            [name]: value,
            classId: 0,
          },
        };
      } else {
        return {
          ...state,
          tagInfo: {
            ...state.tagInfo,
            [name]: value,
          },
        };
      }
    case "UPDATE_IMAGE":
      return {
        ...state,
        tagLogoFile: action.data.tagLogoFile,
        tagLogoPreviewUrl: action.data.tagLogoPreviewUrl,
        imageInput: {
          current: action.data.imageInput.current,
        },
      };
    case "DELETE_IMAGE":
      return {
        ...state,
        tagInfo: {
          ...state.tagInfo,
          tagImage: "",
        },
        tagLogoFile: "",
        tagLogoPreviewUrl: "",
        imageInput: { current: null },
      };
    default:
      return state;
  }
}

export default () => {
  const [tagState, tagDispatch] = useReducer(reducer, initialState);
  const [createTag, { error: createError }] = useMutation(CREATE_TAG);

  const onSubmit = async (e) => {
    e.preventDefault();
    let tagUpdateInfo;

    if (
      tagState.tagInfo.category === "==choose==" ||
      tagState.tagInfo.category === ""
    ) {
      toast.error("Please choose a category.");
      return;
    }

    if (tagState.tagInfo.classId === 0) {
      toast.error("Please choose a Class.");
      return;
    }

    if (tagState.imageInput.current) {
      const { imageInput } = tagState;
      const file = imageInput.current.files[0];
      const fileName = file.name;

      const preSignedUrl = await getPreSignedUrl(fileName);
      uploadToBucket(preSignedUrl, file);
      tagUpdateInfo = {
        classId: tagState.tagInfo.classId,
        tagName: tagState.tagInfo.tagName,
        tagCategory: tagState.tagInfo.category,
        tagImage: "Tag/" + fileName,
      };
    } else {
      tagUpdateInfo = {
        classId: tagState.tagInfo.classId,
        tagName: tagState.tagInfo.tagName,
        tagCategory: tagState.tagInfo.category,
        tagImage: null,
      };
    }

    const {
      data: { createTagInfo },
    } = await createTag({ variables: tagUpdateInfo });

    if (!createTagInfo || createError) {
      toast.error("Error occured while update data.");
      return;
    }
    if (createTagInfo) {
      toast.success("Sucessfullly Update Data!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      return;
    }
  };

  const getPreSignedUrl = async (fileName) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: "Tag/" + fileName,
      ContentType: "image/*",
      ACL: "public-read",
      Expires: signedUrlExpireSeconds,
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
      },
    };

    await fetch(preSignedUrl, option);
  };
  console.log("checkcheck");
  console.log(tagState);
  return (
    <TagInfoContext.Provider value={{ tagState, tagDispatch }}>
      <CreateTagPresenter onSubmit={onSubmit} />
    </TagInfoContext.Provider>
  );
};