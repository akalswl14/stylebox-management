import React, { useReducer } from "react";
import TagInfoPresenter from "./TagInfoPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GET_TAG, UPDATE_TAG } from "./TagInfoQueries";
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
  tagInfo: {},
  isTagImageChange: false,
  tagLogoFile: "",
  tagLogoPreviewUrl: "",
  imageInput: { current: null },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        tagInfo: action.data.tagInfo,
      };
    case "TAGINFO_CHANGE":
      const { name, value } = action.data;
      if (name === "classId") {
        return {
          ...state,
          tagInfo: {
            ...state.tagInfo,
            [name]: Number(value),
            className: "",
          },
        };
      } else if (name === "category") {
        return {
          ...state,
          tagInfo: {
            ...state.tagInfo,
            [name]: value,
            classId: 0,
            className: "",
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
        isTagImageChange: true,
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
        isTagImageChange: true,
        tagLogoFile: "",
        tagLogoPreviewUrl: "",
        imageInput: { current: null },
      };
    default:
      return state;
  }
}

export default ({ match }) => {
  const [tagState, tagDispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(GET_TAG, {
    variables: { id: Number(match.params.tagId) },
  });
  const [updateTag, { error: updateError }] = useMutation(UPDATE_TAG);

  const onSubmit = async (e) => {
    e.preventDefault();
    let tagUpdateInfo;

    if (tagState.tagInfo.classId === 0) {
      toast.error("Please Select Class");
      return;
    }

    if (tagState.isTagImageChange) {
      if (tagState.imageInput.current) {
        const { imageInput } = tagState;
        const file = imageInput.current.files[0];
        const fileName = file.name;

        const preSignedUrl = await getPreSignedUrl(fileName);
        uploadToBucket(preSignedUrl, file);
        tagUpdateInfo = {
          tagId: tagState.tagInfo.tagId,
          tagName: tagState.tagInfo.tagName,
          tagCategory: tagState.tagInfo.category,
          tagImage: "Tag/" + fileName,
          isTagImageChange: tagState.isTagImageChange,
          classId: tagState.tagInfo.classId,
        };
      } else {
        tagUpdateInfo = {
          tagId: tagState.tagInfo.tagId,
          tagName: tagState.tagInfo.tagName,
          tagCategory: tagState.tagInfo.category,
          tagImage: tagState.tagInfo.tagImage,
          isTagImageChange: tagState.isTagImageChange,
          classId: tagState.tagInfo.classId,
        };
      }
    } else {
      tagUpdateInfo = {
        tagId: tagState.tagInfo.tagId,
        tagName: tagState.tagInfo.tagName,
        tagCategory: tagState.tagInfo.category,
        tagImage: tagState.tagInfo.tagImage,
        isTagImageChange: tagState.isTagImageChange,
        classId: tagState.tagInfo.classId,
      };
    }

    const {
      data: { updateTagInfo },
    } = await updateTag({ variables: tagUpdateInfo });

    if (!updateTagInfo || updateError) {
      toast.error("Error occured while update data.");
      return;
    }
    if (updateTagInfo) {
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
      <TagInfoPresenter
        loading={loading}
        data={data}
        error={error}
        onSubmit={onSubmit}
      />
    </TagInfoContext.Provider>
  );
};