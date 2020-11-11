import React, { useReducer } from "react";
import PostInfoPresenter from "./PostInfoPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import AWS, { Credentials } from "aws-sdk";
import {
  CATEGORY_OPTION,
  GET_LINKTYPE,
  GET_POST,
  UPDATE_POST,
} from "./PostInfoQueries";
import { toast } from "react-toastify";

const access = new Credentials({
  accessKeyId: process.env.REACT_APP_IAM_ID,
  secretAccessKey: process.env.REACT_APP_IAM_SECRETKEY,
});

const s3 = new AWS.S3({
  credentials: access,
  region: process.env.REACT_APP_S3_REGION,
});

const signedUrlExpireSeconds = 60 * 15;

const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;

export const PostInfoContext = React.createContext(null);

const initialState = {
  basicInfo: {},
  basicStatus: {},
  tagInfoData: [],
  externalLink: [],
  postImageManagement: [],
  postVideoManagement: [],
  postDescription: "",
  subProductManagement: [],
  isDataUpdated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return action.data;
    case "CHANGE_BASICSTATUS":
      return {
        ...state,
        basicStatus: {
          ...state.basicStatus,
          priority: Number(action.data.value),
        },
      };
    case "CHANGE_BASICINFO":
      return {
        ...state,
        basicInfo: action.data,
      };
    case "CREATE_TAG":
      return {
        ...state,
        tagInfoData: state.tagInfoData.concat(action.data),
      };
    case "CREATE_LINK":
      return {
        ...state,
        externalLink: state.externalLink.concat(action.data),
      };
    case "CREATE_IMAGE":
      return {
        ...state,
        postImageManagement: state.postImageManagement.concat(action.data),
      };
    case "CREATE_VIDEO":
      return {
        ...state,
        postVideoManagement: state.postVideoManagement.concat(action.data),
      };
    case "CREATE_PRODUCT":
      return {
        ...state,
        subProductManagement: state.subProductManagement.concat(action.data),
      };
    case "UPDATE_TAG":
      return {
        ...state,
        tagInfoData: state.tagInfoData.map((eachData) => {
          if (eachData.id === action.data.id) {
            return action.data;
          } else return eachData;
        }),
      };
    case "UPDATE_LINK":
      return {
        ...state,
        externalLink: state.externalLink.map((eachData) => {
          if (eachData.id === action.data.id) {
            return action.data;
          } else return eachData;
        }),
      };
    case "UPDATE_IMAGE":
      return {
        ...state,
        postImageManagement: state.postImageManagement.map((eachData) => {
          if (eachData.id === action.data.id) {
            return action.data;
          } else return eachData;
        }),
      };
    case "UPDATE_IMAGE_FILE":
      return {
        ...state,
        postImageManagement: state.postImageManagement.map((eachData) => {
          if (eachData.id === action.data.id) {
            return {
              id: action.data.id,
              order: action.data.order,
              url: action.data.url,
              imageInput: {
                current: action.data.imageInput.current,
              },
              imageFile: action.data.imageFile,
              imagePreviewUrl: action.data.imagePreviewUrl,
              isImageChange: true,
            };
          } else return eachData;
        }),
      };
    case "UPDATE_VIDEO":
      return {
        ...state,
        postVideoManagement: state.postVideoManagement.map((eachData) => {
          if (eachData.id === action.data.id) {
            return action.data;
          } else return eachData;
        }),
      };
    case "UPDATE_DESCRIPTION":
      return {
        ...state,
        postDescription: action.data.postDescription,
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        subProductManagement: state.subProductManagement.map((eachData) => {
          if (eachData.id === action.data.id) {
            return action.data;
          } else return eachData;
        }),
      };
    case "DELETE_TAG":
      return {
        ...state,
        tagInfoData: state.tagInfoData.filter(
          (eachData) => eachData.id !== action.data.id
        ),
      };
    case "DELETE_LINK":
      return {
        ...state,
        externalLink: state.externalLink.filter(
          (eachData) => eachData.id !== action.data.id
        ),
      };
    case "DELETE_IMAGE":
      return {
        ...state,
        postImageManagement: state.postImageManagement.filter(
          (eachData) => eachData.id !== action.data.id
        ),
      };
    case "DELETE_VIDEO":
      return {
        ...state,
        postVideoManagement: state.postVideoManagement.filter(
          (eachData) => eachData.id !== action.data.id
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        subProductManagement: state.subProductManagement.filter(
          (eachData) => eachData.id !== action.data.id
        ),
      };
    default:
      return state;
  }
}

export default ({ match }) => {
  const [postState, postDispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: Number(match.params.postId) },
  });

  const {
    loading: loading_CategoryData,
    error: error_CategoryData,
    data: data_CategoryData,
  } = useQuery(CATEGORY_OPTION);

  const {
    loading: loading_LinkTypeData,
    error: error_LinkTypeData,
    data: data_LinkTypeData,
  } = useQuery(GET_LINKTYPE);

  const [updatePostInfo, { error: updateError }] = useMutation(UPDATE_POST);

  const onSubmit = async (e) => {
    e.preventDefault();

    const mutationData = {
      tags: [],
      externalLinks: [],
      images: [],
      videos: [],
      subProducts: [],
    };

    for (const eachData of postState.tagInfoData) {
      mutationData.tags.push({
        id: eachData.tagId,
        order: eachData.order,
      });
    }

    for (const eachData of postState.externalLink) {
      mutationData.externalLinks.push({
        url: eachData.url,
        order: eachData.order,
        linkType: eachData.linkType,
        isShown: eachData.isShown,
      });
    }

    for (const eachData of postState.postImageManagement) {
      let imageUpdateInfo;
      if (eachData.isImageChange) {
        if (eachData.imageInput.current) {
          const { imageInput } = eachData;
          const file = imageInput.current.files[0];
          const fileName = file.name;
          const preSignedUrl = await getPreSignedUrl(fileName);
          uploadToBucket(preSignedUrl, file);
          imageUpdateInfo = {
            url: "Post/" + fileName,
            order: eachData.order,
          };
        } else {
          imageUpdateInfo = {
            url: eachData.url,
            order: eachData.order,
          };
        }
      } else {
        imageUpdateInfo = {
          url: eachData.url,
          order: eachData.order,
        };
      }
      mutationData.images.push(imageUpdateInfo);
    }

    for (const eachData of postState.postVideoManagement) {
      mutationData.videos.push({
        url: eachData.url,
        order: eachData.order,
        isYoutube: true,
      });
    }

    for (const eachData of postState.subProductManagement) {
      mutationData.subProducts.push({
        id: eachData.productId,
      });
    }

    const {
      data: { updatePostManage },
    } = await updatePostInfo({
      variables: {
        id: Number(match.params.postId),
        mainProductId: postState.basicInfo.mainProductId,
        priority: postState.basicStatus.priority,
        isDescriptionChange: false,
        description: postState.postDescription,
        tags: mutationData.tags,
        externalLinks: mutationData.externalLinks,
        images: mutationData.images,
        videos: mutationData.videos,
        subProducts: mutationData.subProducts,
      },
    });

    if (!updatePostManage || updateError) {
      toast.error("Error occured while update data.");
      return;
    }

    if (updatePostManage) {
      toast.success("Sucessfully Update Data!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      return;
    }
  };

  const getPreSignedUrl = async (fileName) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: "Post/" + fileName,
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

  return (
    <PostInfoContext.Provider value={{ postState, postDispatch }}>
      <PostInfoPresenter
        onSubmit={onSubmit}
        loading={loading}
        data={data}
        error={error}
        loading_CategoryData={loading_CategoryData}
        error_CategoryData={error_CategoryData}
        data_CategoryData={data_CategoryData}
        loading_LinkTypeData={loading_LinkTypeData}
        error_LinkTypeData={error_LinkTypeData}
        data_LinkTypeData={data_LinkTypeData}
      />
    </PostInfoContext.Provider>
  );
};
