import React, { useReducer, useState } from "react";
import PostInfoPresenter from "./PostInfoPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import AWS, { Credentials } from "aws-sdk";
import { CATEGORY_OPTION, GET_LINKTYPE, CREATE_POST } from "./PostInfoQueries";
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
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return action.data;
    case "SET_PRODUCT_TAG":
      let tagInfo = [],
        order = 1;
      for (const eachData of state.tagInfoData) {
        tagInfo.push(eachData);
      }
      for (const eachData of action.data.tagInfoData) {
        tagInfo.push(eachData);
      }
      tagInfo.map((tag) => {
        tag.order = order++;
      });
      return {
        ...state,
        tagInfoData: tagInfo,
      };
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

export default () => {
  const [postState, postDispatch] = useReducer(reducer, initialState);
  const [confirmState, setConfirm] = useState(false);

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

  const [createPost, { error: createError }] = useMutation(CREATE_POST);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (confirmState) {
      toast.error("You have already pressed the confirm button.");
      return;
    }
    setConfirm(true);

    if (postState.basicInfo.mainProductId === 0) {
      toast.error("Select the main product name.");
      setConfirm(false);
      return;
    }
    if (!postState.basicInfo.mainProductId) {
      toast.error("Select the main product name.");
      setConfirm(false);
      return;
    }

    const mutationData = {
      tags: [],
      externalLinks: [],
      images: [],
      videos: [],
      subProducts: [],
    };

    let web_order = 1;

    if (postState.tagInfoData.length !== 0) {
      web_order = 1;
      let TagOrderList = [];
      let TagIdList = [];
      for (const eachData of postState.tagInfoData) {
        if (TagOrderList.includes(Number(eachData.order))) {
          toast.error("Tag Order values should not be the same.");
          setConfirm(false);
          return;
        }
        if (isNaN(Number(eachData.order))) {
          toast.error("Invalid Tag Order Value.");
          setConfirm(false);
          return;
        }
        if (Number(eachData.order) <= 0) {
          toast.error("Tag Order Value should be bigger than 0.");
          setConfirm(false);
          return;
        }
        if (
          Number(eachData.tagId) === 0 ||
          Number(eachData.classId) === 0 ||
          eachData.category === "-- CHOOSE DATA --" ||
          eachData.category === "-- LOADING --"
        ) {
          toast.error("Please choose Tag.");
          setConfirm(false);
          return;
        }
        if (TagIdList.includes(Number(eachData.tagId))) {
          toast.error("Tag should not be the same.");
          setConfirm(false);
          return;
        }
        TagOrderList.push(Number(eachData.order));
        TagIdList.push(Number(eachData.tagId));
        mutationData.tags.push({
          id: Number(eachData.tagId),
          order: Number(web_order++),
        });
      }
    }

    if (postState.externalLink.length !== 0) {
      web_order = 1;
      let LinkOrderList = [];
      for (const eachData of postState.externalLink) {
        if (LinkOrderList.includes(Number(eachData.order))) {
          toast.error("External Link Order values should not be the same.");
          setConfirm(false);
          return;
        }
        if (isNaN(Number(eachData.order))) {
          toast.error("Invalid External Link Order value.");
          setConfirm(false);
          return;
        }
        if (Number(eachData.order) <= 0) {
          toast.error("External Link Order values should be bigger than 0.");
          setConfirm(false);
          return;
        }
        if (eachData.linkType === "-- CHOOSE DATA --") {
          toast.error("Please choose Link Type on External Link.");
          setConfirm(false);
          return;
        }
        if (
          eachData.url === "http://" ||
          eachData.url === "" ||
          eachData.url === "https://"
        ) {
          toast.error("Invalid External Link URL.");
          setConfirm(false);
          return;
        }
        LinkOrderList.push(Number(eachData.order));
        mutationData.externalLinks.push({
          url: eachData.url,
          order: Number(web_order++),
          linkType: eachData.linkType,
          isShown: eachData.isShown,
        });
      }
    }

    let TimeNumber = new Date();
    if (postState.postImageManagement.length <= 0) {
      toast.error("Please add a post Image.");
      setConfirm(false);
      return;
    }
    if (postState.postImageManagement.length !== 0) {
      web_order = 1;
      let ImageOrderList = [];
      for (const eachData of postState.postImageManagement) {
        let imageUpdateInfo;
        if (ImageOrderList.includes(Number(eachData.order))) {
          toast.error("Image Order values should not be the same.");
          setConfirm(false);
          return;
        }
        if (isNaN(Number(eachData.order))) {
          toast.error("Invalid Image Order value.");
          setConfirm(false);
          return;
        }
        if (Number(eachData.order) <= 0) {
          toast.error("Image Order values should be bigger than 0.");
          setConfirm(false);
          return;
        }
        if (!eachData.imageInput) {
          toast.error("Please add a post Image.");
          setConfirm(false);
          return;
        }
        if (eachData.imageInput.current) {
          if (eachData.imageFile === "") {
            toast.error("Please choose Post Image.");
            setConfirm(false);
            return;
          }
          const ImageType = eachData.imageFile.type.substring(6);
          const fileName =
            TimeNumber.getTime() + "_" + eachData.order + "." + ImageType;
          imageUpdateInfo = {
            url: fileName,
            order: Number(eachData.order),
          };
        } else {
          imageUpdateInfo = {
            url: eachData.url,
            order: Number(web_order++),
          };
        }
        ImageOrderList.push(Number(eachData.order));
        mutationData.images.push(imageUpdateInfo);
      }
    }

    if (postState.postVideoManagement.length !== 0) {
      web_order = 1;
      let VideoOrderList = [];
      for (const eachData of postState.postVideoManagement) {
        if (VideoOrderList.includes(Number(eachData.order))) {
          toast.error("Video Order values should not be the same.");
          setConfirm(false);
          return;
        }
        if (isNaN(Number(eachData.order))) {
          toast.error("Invalid Video Order value.");
          setConfirm(false);
          return;
        }
        if (Number(eachData.order) <= 0) {
          toast.error("Video Order values should be bigger than 0.");
          setConfirm(false);
          return;
        }
        if (
          eachData.url === "http://" ||
          eachData.url === "" ||
          eachData.url === "https://"
        ) {
          toast.error("Invalid Video URL value.");
          setConfirm(false);
          return;
        }
        VideoOrderList.push(Number(eachData.order));
        mutationData.videos.push({
          url: eachData.url,
          order: Number(web_order++),
          isYoutube: true,
        });
      }
    }

    if (postState.subProductManagement.length !== 0) {
      let ProductIdList = [];
      let ProductOrderList = [];
      for (const eachData of postState.subProductManagement) {
        if (ProductOrderList.includes(Number(eachData.order))) {
          toast.error("Product Order values should not be the same.");
          setConfirm(false);
          return;
        }
        if (isNaN(Number(eachData.order))) {
          toast.error("Invalid Product Order Value.");
          setConfirm(false);
          return;
        }
        if (Number(eachData.order) <= 0) {
          toast.error("Product Order Value should be bigger than 0.");
          setConfirm(false);
          return;
        }
        if (Number(eachData.productId) === 0) {
          toast.error("Please choose Sub Product.");
          setConfirm(false);
          return;
        }
        if (ProductIdList.includes(Number(eachData.productId))) {
          toast.error("Sub Product should not be the same.");
          setConfirm(false);
          return;
        }
        ProductOrderList.push(Number(eachData.order));
        ProductIdList.push(Number(eachData.productId));
        mutationData.subProducts.push({
          id: Number(eachData.productId),
        });
      }
    }

    const {
      data: { createPostManage },
    } = await createPost({
      variables: {
        mainProductId: postState.basicInfo.mainProductId,
        priority: postState.basicStatus.priority
          ? postState.basicStatus.priority
          : 1,
        description: postState.postDescription ? postState.postDescription : "",
        tags: mutationData.tags,
        externalLinks: mutationData.externalLinks,
        images: mutationData.images,
        videos: mutationData.videos,
        subProducts: mutationData.subProducts,
      },
    });

    if (!createPostManage || createError) {
      toast.error("Error occured while create data.");
      setConfirm(false);
      return;
    }

    if (createPostManage && createPostManage.postId) {
      for (const eachData of postState.postImageManagement) {
        if (eachData.imageInput.current) {
          const { imageInput } = eachData;
          const ImageType = eachData.imageFile.type.substring(6);
          const file = imageInput.current.files[0];
          const fileName =
            createPostManage.postId +
            "/" +
            TimeNumber.getTime() +
            "_" +
            eachData.order +
            "." +
            ImageType;
          try {
            const preSignedUrl = await getPreSignedUrl(fileName, ImageType);
            await uploadToBucket(preSignedUrl, file, ImageType);
          } catch (e) {
            toast.error("Error occured while create data.");
            setConfirm(false);
            return;
          }
        }
      }

      toast.success("Sucessfully Create Data!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
      return;
    }
  };

  const getPreSignedUrl = async (fileName, fileType) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: "Post/" + fileName,
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

    await fetch(preSignedUrl, option);
  };

  return (
    <PostInfoContext.Provider value={{ postState, postDispatch }}>
      <PostInfoPresenter
        onSubmit={onSubmit}
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
