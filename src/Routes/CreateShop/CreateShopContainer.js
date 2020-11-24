import React, { useReducer } from "react";
import CreateShopPresenter from "./CreateShopPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  CREATE_SHOP,
  CATEGORY_OPTION,
  GET_LINKTYPE,
} from "./CreateShopQueries";
import { toast } from "react-toastify";
import putImagetoS3 from "./putImagetoS3";

export const ShopInfoContext = React.createContext(null);

const initialState = {
  BasicInformation: {
    shopId: "-",
    shopName: "",
    phoneNumber: "",
    MainAddress: "",
    MainMapUrl: "",
    ShopLogoFile: "",
    ShopLogoPreviewUrl: "",
    CheckShopName: false,
  },
  BasicStatus: {
    ShopRank: "-",
    TotalNumberofPosts: 0,
    TotalLikes: 0,
    RegistrationData: "--/--/----",
    RankingWeight: 0,
    TotalNumberofProducts: 0,
    TotalViews: 0,
    LastUpdated: "--/--/--- --:--:--",
  },
  TagInformation: [],
  SocialMediaLink: {
    FacebookLink: "",
    InstagramLink: "",
    YoutubeLink: "",
  },
  ExternalLink: [],
  ShopImagesManagement: [],
  ShopVideoManagement: [],
  ShopDescription: "",
  BranchManagement: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_BASICINFO":
      return { ...state, BasicInformation: action.data.BasicInformation };
    case "UPDATE_BASICSTATUS":
      return { ...state, BasicStatus: action.data.BasicStatus };
    case "UPDATE_TAGINFO":
      return { ...state, TagInformation: action.data.TagInformation };
    case "UPDATE_SNSLINK":
      return { ...state, SocialMediaLink: action.data.SocialMediaLink };
    case "UPDATE_EXTERNALLINK":
      return { ...state, ExternalLink: action.data.ExternalLink };
    case "UPDATE_SHOPIMAGE":
      return {
        ...state,
        ShopImagesManagement: action.data.ShopImagesManagement,
      };
    case "UPDATE_SHOPVIDEO":
      return { ...state, ShopVideoManagement: action.data.ShopVideoManagement };
    case "UPDATE_DESCRIPTION":
      return { ...state, ShopDescription: action.data.ShopDescription };
    case "UPDATE_BRANCH":
      return { ...state, BranchManagement: action.data.BranchManagement };
    default:
      return state;
  }
}

export default () => {
  const [ShopInfoState, ShopInfoDispatch] = useReducer(reducer, initialState);

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

  const [CreateShopMutation, { error: CreateError }] = useMutation(CREATE_SHOP);

  const onSubmit = async (e) => {
    e.preventDefault();

    var TimeNumber = new Date();

    if (ShopInfoState.BasicInformation.shopName === "") {
      toast.error("Please enter Shop Name.");
      return;
    }
    if (!ShopInfoState.BasicInformation.CheckShopName) {
      toast.error("Invalid Shop Name. Please check Shop Name.");
      return;
    }
    if (ShopInfoState.BasicInformation.phoneNumber === "") {
      toast.error("Please enter Shop Phone Number.");
      return;
    }
    if (ShopInfoState.BasicInformation.MainAddress === "") {
      toast.error("Please enter Shop Main Address.");
      return;
    }
    if (
      ShopInfoState.BasicInformation.MainMapUrl === "http://" ||
      ShopInfoState.BasicInformation.MainMapUrl === "" ||
      ShopInfoState.BasicInformation.MainMapUrl === "https://"
    ) {
      toast.error("Invalid Shop Main Map URL.");
      return;
    }
    if (isNaN(Number(ShopInfoState.BasicStatus.RankingWeight))) {
      toast.error("Invalid Weight Value.");
      return;
    }
    if (Number(ShopInfoState.BasicStatus.RankingWeight) < 0) {
      toast.error("Weight Value should be 0 and/or more.");
      return;
    }
    let TagOrderList = [];
    let TagIdList = [];
    let rtnTagList = [];
    if (ShopInfoState.TagInformation.length > 10) {
      toast.error("Up to 10 Tags can be registered.");
      return;
    }
    for (const eachTag of ShopInfoState.TagInformation) {
      if (TagOrderList.includes(Number(eachTag.order))) {
        toast.error("Tag Order values should not be the same.");
        return;
      }
      if (isNaN(Number(eachTag.order))) {
        toast.error("Invalid Tag Order Value.");
        return;
      }
      if (Number(eachTag.order) <= 0) {
        toast.error("Tag Order Value should be bigger than 0");
      }
      if (
        Number(eachTag.tagId) === 0 ||
        Number(eachTag.classId) === 0 ||
        eachTag.category === "-- CHOOSE DATA --" ||
        eachTag.category === "-- LOADING --"
      ) {
        toast.error("Please choose Tag.");
        return;
      }
      if (TagIdList.includes(Number(eachTag.tagId))) {
        toast.error("Tag should not be the same.");
        return;
      }
      TagOrderList.push(Number(eachTag.order));
      TagIdList.push(Number(eachTag.tagId));
      rtnTagList.push({
        id: Number(eachTag.tagId),
        order: Number(eachTag.order),
      });
    }
    rtnTagList.sort((a, b) => a.order - b.order);
    let LinkOrderList = [];
    let rtnExternalLinkList = [];
    if (ShopInfoState.ExternalLink.length > 10) {
      toast.error("Up to 10 External Links can be registered.");
      return;
    }
    for (const eachLink of ShopInfoState.ExternalLink) {
      if (LinkOrderList.includes(Number(eachLink.order))) {
        toast.error("External Link Order values should not be the same.");
        return;
      }
      if (isNaN(Number(eachLink.order))) {
        toast.error("Invalid External Link Order value.");
        return;
      }
      if (Number(eachLink.order) <= 0) {
        toast.error("External Link Order values should be bigger than 0.");
        return;
      }
      if (eachLink.linkType === "-- CHOOSE DATA --") {
        toast.error("Please choose Link Type on External Link.");
        return;
      }
      if (
        eachLink.url === "http://" ||
        eachLink.url === "" ||
        eachLink.url === "https://"
      ) {
        toast.error("Invalid External Link URL.");
        return;
      }
      LinkOrderList.push(Number(eachLink.order));
      rtnExternalLinkList.push({
        order: Number(eachLink.order),
        linkType: eachLink.linkType,
        url: eachLink.url,
        isShown: eachLink.isShown,
      });
    }
    let ImageOrderList = [];
    let rtnImageList = [];
    let s3ImageList = [];
    if (ShopInfoState.ShopImagesManagement.length > 10) {
      toast.error("Up to 10 Shop Images can be registered.");
      return;
    }
    for (const eachImage of ShopInfoState.ShopImagesManagement) {
      if (ImageOrderList.includes(Number(eachImage.order))) {
        toast.error("Image Order values should not be the same.");
        return;
      }
      if (isNaN(Number(eachImage.order))) {
        toast.error("Invalid Image Order value.");
        return;
      }
      if (Number(eachImage.order) <= 0) {
        toast.error("Image Order values should be bigger than 0.");
        return;
      }
      if (eachImage.ImageFile === "") {
        toast.error("Please choose Shop Image.");
        return;
      }
      const ImageType = eachImage.ImageFile.type.substring(6);
      TimeNumber = new Date();
      const fileName =
        TimeNumber.getTime() + "_" + eachImage.order + "." + ImageType;
      ImageOrderList.push(Number(eachImage.order));
      rtnImageList.push({ order: Number(eachImage.order), url: fileName });
      s3ImageList.push({ fileName, ImageFile: eachImage.ImageFile });
    }
    let VideoOrderList = [];
    let rtnVideoList = [];
    if (ShopInfoState.ShopVideoManagement.length > 5) {
      toast.error("Up to 10 Videos can be registered.");
      return;
    }
    for (const eachVideo of ShopInfoState.ShopVideoManagement) {
      if (VideoOrderList.includes(Number(eachVideo.order))) {
        toast.error("Video Order values should not be the same.");
        return;
      }
      if (isNaN(Number(eachVideo.order))) {
        toast.error("Invalid Video Order value.");
        return;
      }
      if (Number(eachVideo.order) <= 0) {
        toast.error("Video Order values should be bigger than 0.");
        return;
      }
      if (
        eachVideo.url === "http://" ||
        eachVideo.url === "" ||
        eachVideo.url === "https://"
      ) {
        toast.error("Invalid Video URL value.");
        return;
      }
      VideoOrderList.push(Number(eachVideo.order));
      rtnVideoList.push({ order: Number(eachVideo.order), url: eachVideo.url });
    }
    let rtnBranchList = [];
    if (ShopInfoState.BranchManagement.length > 5) {
      toast.error("Up to 10 Branches can be registered.");
      return;
    }
    for (const eachBranch of ShopInfoState.BranchManagement) {
      if (eachBranch.BranchName === "") {
        toast.error("Please enter Branch Name.");
        return;
      }
      if (eachBranch.PhoneNumber === "") {
        toast.error("Please enter Branch Phone Number.");
        return;
      }
      if (eachBranch.Address === "") {
        toast.error("Please enter Branch Address.");
        return;
      }
      if (
        eachBranch.MapUrl === "http://" ||
        eachBranch.MapUrl === "" ||
        eachBranch.MapUrl === "https://"
      ) {
        toast.error("Invalid Branch Map URL.");
        return;
      }
      rtnBranchList.push({
        branchName: eachBranch.BranchName,
        branchPhoneNumber: eachBranch.PhoneNumber,
        branchAddress: eachBranch.Address,
        branchGoogleMapUrl: eachBranch.MapUrl,
      });
    }
    let rtnLogoFileName = null;
    if (ShopInfoState.BasicInformation.ShopLogoFile !== "") {
      const LogoImageType = ShopInfoState.BasicInformation.ShopLogoFile.type.substring(
        6
      );
      TimeNumber = new Date();
      rtnLogoFileName = TimeNumber.getTime() + "_ShopLogo." + LogoImageType;
    }

    const mutationData = {
      shopName: ShopInfoState.BasicInformation.shopName,
      logoUrl: rtnLogoFileName,
      phoneNumber: ShopInfoState.BasicInformation.phoneNumber,
      mainBranchAddress: ShopInfoState.BasicInformation.MainAddress,
      mainBranchMapUrl: ShopInfoState.BasicInformation.MainMapUrl,
      weight: Number(ShopInfoState.BasicStatus.RankingWeight),
      tags: rtnTagList,
      FacebookLink:
        ShopInfoState.SocialMediaLink.FacebookLink === ""
          ? null
          : ShopInfoState.SocialMediaLink.FacebookLink,
      InstagramLink:
        ShopInfoState.SocialMediaLink.InstagramLink === ""
          ? null
          : ShopInfoState.SocialMediaLink.InstagramLink,
      YoutubeLink:
        ShopInfoState.SocialMediaLink.YoutubeLink === ""
          ? null
          : ShopInfoState.SocialMediaLink.YoutubeLink,
      externalLinks: rtnExternalLinkList,
      shopImages: rtnImageList,
      shopVideos: rtnVideoList,
      description:
        ShopInfoState.ShopDescription === ""
          ? null
          : ShopInfoState.ShopDescription,
      branches: rtnBranchList,
    };

    const {
      data: { createShop },
    } = await CreateShopMutation({
      variables: mutationData,
    });
    if (!createShop || CreateError) {
      toast.error("Error occured while create data.");
      return;
    }

    if (createShop && createShop.shopId) {
      const ShopId = createShop.shopId;
      try {
        for (const eachImage of s3ImageList) {
          await putImagetoS3({
            file: eachImage.ImageFile,
            fileName: "Shop/" + ShopId + "/" + eachImage.fileName,
          });
        }
      } catch (e) {
        toast.error("Error occured while create data.");
        return;
      }
      try {
        if (rtnLogoFileName) {
          await putImagetoS3({
            file: ShopInfoState.BasicInformation.ShopLogoFile,
            fileName: "Shop/" + ShopId + "/" + rtnLogoFileName,
          });
        }
      } catch (e) {
        toast.error("Error occured while create data.");
        return;
      }
      toast.success("Sucessfullly create Data!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
      return;
    }
  };

  return (
    <ShopInfoContext.Provider value={{ ShopInfoState, ShopInfoDispatch }}>
      <CreateShopPresenter
        onSubmit={onSubmit}
        loading_CategoryData={loading_CategoryData}
        error_CategoryData={error_CategoryData}
        data_CategoryData={data_CategoryData}
        loading_LinkTypeData={loading_LinkTypeData}
        error_LinkTypeData={error_LinkTypeData}
        data_LinkTypeData={data_LinkTypeData}
      />
    </ShopInfoContext.Provider>
  );
};
