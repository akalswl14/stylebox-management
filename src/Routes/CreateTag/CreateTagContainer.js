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
  isCheck: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "TAGINFO_CHANGE":
      const { name, value } = action.data;
      if (name === "classId") {
        return {
          ...state,
          isCheck: false,
          tagInfo: {
            ...state.tagInfo,
            [name]: Number(value),
          },
        };
      } else if (name === "category") {
        return {
          ...state,
          isCheck: false,
          tagInfo: {
            ...state.tagInfo,
            [name]: value,
            classId: 0,
          },
        };
      } else {
        return {
          ...state,
          isCheck: false,
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
    case "TAGNAME_CHECK":
      if (action.data.isCheck) {
        return {
          ...state,
          isCheck: action.data.isCheck,
        };
      } else {
        return {
          tagInfo: {
            ...state.tagInfo,
            tagName: "",
          },
          isCheck: action.data.isCheck,
        };
      }
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

    if (!tagState.isCheck) {
      toast.error("Invalid tag name.");
      return;
    }

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
    let TimeNumber = new Date();
    if (tagState.imageInput.current) {
      const ImageType = tagState.tagLogoFile.type.substring(6);
      const fileName = TimeNumber.getTime() + "." + ImageType;

      tagUpdateInfo = {
        classId: tagState.tagInfo.classId,
        tagName: tagState.tagInfo.tagName,
        tagCategory: tagState.tagInfo.category,
        tagImage: fileName,
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

    if (createTagInfo && createTagInfo.tagId) {
      if (tagState.imageInput.current) {
        const { imageInput } = tagState;
        const ImageType = tagState.tagLogoFile.type.substring(6);
        const file = imageInput.current.files[0];
        const fileName =
          createTagInfo.tagId + "/" + TimeNumber.getTime() + "." + ImageType;
        try {
          const preSignedUrl = await getPreSignedUrl(fileName);
          await uploadToBucket(preSignedUrl, file);
        } catch (e) {
          toast.error("Error occured while create data.");
          return;
        }
      }
      toast.success("Sucessfullly Create Data!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
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
  return (
    <TagInfoContext.Provider value={{ tagState, tagDispatch }}>
      <CreateTagPresenter onSubmit={onSubmit} />
    </TagInfoContext.Provider>
  );
};
