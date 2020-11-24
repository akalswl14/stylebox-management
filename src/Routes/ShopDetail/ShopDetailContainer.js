import React, { useReducer } from "react";
import ShopDetailPresenter from "./ShopDetailPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { GET_SHOP, UPDATE_SHOP } from "./ShopDetailQueries";
import { toast } from "react-toastify";
import putImagetoS3 from "./putImagetoS3";
import deleteImagefromS3 from "./deleteImagefromS3";

export const ShopInfoContext = React.createContext(null);

const initialState = {
  BasicInformation: {
    shopId: "-",
    shopName: {
      value: "",
      isChange: false,
      originalValue: "",
      CheckShopName: false,
    },
    phoneNumber: { value: "", isChange: false },
    MainAddress: { value: "", isChange: false },
    MainMapUrl: { value: "", isChange: false },
    ShopLogo: { File: "", PreviewUrl: "", isChange: false },
  },
  BasicStatus: {
    ShopRank: "-",
    TotalNumberofPosts: 0,
    TotalLikes: 0,
    RegistrationData: "--/--/----",
    RankingWeight: { value: 0, isChange: false },
    TotalNumberofProducts: 0,
    TotalViews: 0,
    LastUpdated: "--/--/--- --:--:--",
  },
  TagInformation: { value: [], isChange: false },
  SocialMediaLink: {
    FacebookLink: { value: "", isChange: false },
    InstagramLink: { value: "", isChange: false },
    YoutubeLink: { value: "", isChange: false },
  },
  ExternalLink: { value: [], isChange: false },
  ShopImagesManagement: { value: [], isChange: false },
  ShopVideoManagement: { value: [], isChange: false },
  ShopDescription: { value: "", isChange: false },
  BranchManagement: { value: [], isChange: false },
  CategoryData: [],
  LinkTypeData: [],
  DeleteImageList: [],
  isDataUpdated: false,
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
    case "UPDATE_BATCH":
      return action.data;
    default:
      return state;
  }
}

export default ({ match }) => {
  const shopId = Number(match.params.shopId);
  const [ShopInfoState, ShopInfoDispatch] = useReducer(reducer, initialState);

  const { loading, error, data } = useQuery(GET_SHOP, {
    variables: { shopId },
  });

  const [UpdateShopMutation, { error: UpdateError }] = useMutation(UPDATE_SHOP);

  const onSubmit = async (e) => {
    e.preventDefault();
    var TimeNumber = new Date();

    if (ShopInfoState.BasicInformation.shopName.value === "") {
      toast.error("Please enter Shop Name.");
      return;
    }
    if (!ShopInfoState.BasicInformation.shopName.CheckShopName) {
      toast.error("Invalid Shop Name. Please check Shop Name.");
      return;
    }
    if (ShopInfoState.BasicInformation.phoneNumber.value === "") {
      toast.error("Please enter Shop Phone Number.");
      return;
    }
    if (ShopInfoState.BasicInformation.MainAddress.value === "") {
      toast.error("Please enter Shop Main Address.");
      return;
    }
    if (
      ShopInfoState.BasicInformation.MainMapUrl.value === "http://" ||
      ShopInfoState.BasicInformation.MainMapUrl.value === "" ||
      ShopInfoState.BasicInformation.MainMapUrl.value === "https://"
    ) {
      toast.error("Invalid Shop Main Map URL.");
      return;
    }
    if (isNaN(Number(ShopInfoState.BasicStatus.RankingWeight.value))) {
      toast.error("Invalid Weight Value.");
      return;
    }
    if (Number(ShopInfoState.BasicStatus.RankingWeight.value) < 0) {
      toast.error("Weight Value should be 0 and/or more.");
      return;
    }
    let TagOrderList = [];
    let TagIdList = [];
    let rtnTagList = [];
    if (ShopInfoState.TagInformation.value.length > 10) {
      toast.error("Up to 10 Tags can be registered.");
      return;
    }
    if (ShopInfoState.TagInformation.isChange) {
      for (const eachTag of ShopInfoState.TagInformation.value) {
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
    }
    rtnTagList.sort((a, b) => a.order - b.order);
    let LinkOrderList = [];
    let rtnExternalLinkList = [];
    if (ShopInfoState.ExternalLink.value.length > 10) {
      toast.error("Up to 10 External Links can be registered.");
      return;
    }
    if (ShopInfoState.ExternalLink.isChange) {
      for (const eachLink of ShopInfoState.ExternalLink.value) {
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
    }
    let ImageOrderList = [];
    let rtnImageList = [];
    let s3ImageList = [];
    if (ShopInfoState.ShopImagesManagement.value.length > 10) {
      toast.error("Up to 10 Shop Images can be registered.");
      return;
    }
    if (ShopInfoState.ShopImagesManagement.isChange) {
      for (const eachImage of ShopInfoState.ShopImagesManagement.value) {
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
        if (eachImage.ImageFile === "" && eachImage.isNewImage) {
          toast.error("Please choose Shop Image.");
          return;
        }
        let fileName = "";
        if (eachImage.isNewImage) {
          const ImageType = eachImage.ImageFile.type.substring(6);
          TimeNumber = new Date();
          fileName =
            "Shop/" +
            ShopInfoState.BasicInformation.shopId +
            "/" +
            TimeNumber.getTime() +
            "_" +
            eachImage.order +
            "." +
            ImageType;
          s3ImageList.push({ fileName, ImageFile: eachImage.ImageFile });
        } else {
          fileName = eachImage.s3Key;
        }
        ImageOrderList.push(Number(eachImage.order));
        rtnImageList.push({ order: Number(eachImage.order), url: fileName });
      }
    }
    let VideoOrderList = [];
    let rtnVideoList = [];
    if (ShopInfoState.ShopVideoManagement.value.length > 5) {
      toast.error("Up to 10 Videos can be registered.");
      return;
    }
    if (ShopInfoState.ShopVideoManagement.isChange) {
      for (const eachVideo of ShopInfoState.ShopVideoManagement.value) {
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
        rtnVideoList.push({
          order: Number(eachVideo.order),
          url: eachVideo.url,
        });
      }
    }
    let rtnBranchList = [];
    if (ShopInfoState.BranchManagement.value.length > 20) {
      toast.error("Up to 10 Branches can be registered.");
      return;
    }
    if (ShopInfoState.BranchManagement.isChange) {
      for (const eachBranch of ShopInfoState.BranchManagement.value) {
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
          id: eachBranch.BranchId,
          branchName: eachBranch.BranchName,
          branchPhoneNumber: eachBranch.PhoneNumber,
          branchAddress: eachBranch.Address,
          branchGoogleMapUrl: eachBranch.MapUrl,
        });
      }
    }
    let rtnShopLogo = { isLogoUrlChange: false, logoUrl: null };
    if (ShopInfoState.BasicInformation.ShopLogo.PreviewUrl === "") {
      if (ShopInfoState.BasicInformation.ShopLogo.isChange) {
        rtnShopLogo.isLogoUrlChange = true;
        rtnShopLogo.logoUrl = null;
      }
    } else {
      if (ShopInfoState.BasicInformation.ShopLogo.isNewImage) {
        const LogoImageType = ShopInfoState.BasicInformation.ShopLogo.File.type.substring(
          6
        );
        TimeNumber = new Date();
        const LogoFileName =
          "Shop/" +
          ShopInfoState.BasicInformation.shopId +
          "/" +
          TimeNumber.getTime() +
          "_ShopLogo." +
          LogoImageType;
        s3ImageList.push({
          fileName: LogoFileName,
          ImageFile: ShopInfoState.BasicInformation.ShopLogo.File,
        });
        rtnShopLogo.isLogoUrlChange = true;
        rtnShopLogo.logoUrl = LogoFileName;
      }
    }

    const mutationData = {
      shopId: ShopInfoState.BasicInformation.shopId,
      shopName: ShopInfoState.BasicInformation.shopName.isChange
        ? ShopInfoState.BasicInformation.shopName.value
        : null,
      isLogoUrlChange: rtnShopLogo.isLogoUrlChange,
      logoUrl: rtnShopLogo.logoUrl,
      phoneNumber: ShopInfoState.BasicInformation.phoneNumber.isChange
        ? ShopInfoState.BasicInformation.phoneNumber.value
        : null,
      weight: ShopInfoState.BasicStatus.RankingWeight.isChange
        ? Number(ShopInfoState.BasicStatus.RankingWeight.value)
        : null,
      isDescriptionChange: ShopInfoState.ShopDescription.isChange,
      description: ShopInfoState.ShopDescription.value,
      tags: ShopInfoState.TagInformation.isChange ? rtnTagList : null,
      externalLinks: ShopInfoState.ExternalLink.isChange
        ? rtnExternalLinkList
        : null,
      isFacebookLinkChange: ShopInfoState.SocialMediaLink.FacebookLink.isChange,
      FacebookLink: ShopInfoState.SocialMediaLink.FacebookLink.value,
      isInstagramLinkChange:
        ShopInfoState.SocialMediaLink.InstagramLink.isChange,
      InstagramLink: ShopInfoState.SocialMediaLink.InstagramLink.value,
      isYoutubeLinkChange: ShopInfoState.SocialMediaLink.YoutubeLink.isChange,
      YoutubeLink: ShopInfoState.SocialMediaLink.YoutubeLink.value,
      shopImages: ShopInfoState.ShopImagesManagement.isChange
        ? rtnImageList
        : null,
      shopVideos: ShopInfoState.ShopVideoManagement.isChange
        ? rtnVideoList
        : null,
      branches: ShopInfoState.BranchManagement.isChange ? rtnBranchList : null,
      mainBranchAddress: ShopInfoState.BasicInformation.MainAddress.isChange
        ? ShopInfoState.BasicInformation.MainAddress.value
        : null,
      mainBranchMapUrl: ShopInfoState.BasicInformation.MainMapUrl.isChange
        ? ShopInfoState.BasicInformation.MainMapUrl.value
        : null,
    };

    const {
      data: { updateShop },
    } = await UpdateShopMutation({
      variables: mutationData,
    });
    if (!updateShop || UpdateError) {
      toast.error("Error occured while update data.");
      return;
    }

    if (updateShop) {
      const ShopId = ShopInfoState.BasicInformation.shopId;
      try {
        for (const eachImage of s3ImageList) {
          await putImagetoS3({
            file: eachImage.ImageFile,
            fileName: eachImage.fileName,
          });
        }
      } catch (e) {
        toast.error("Error occured while update data.");
        return;
      }
      try {
        await deleteImagefromS3({
          keys: ShopInfoState.DeleteImageList,
        });
      } catch (e) {
        toast.error("Error occured while update data.");
        return;
      }
      toast.success("Sucessfullly update Data!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
      return;
    }
  };

  return (
    <ShopInfoContext.Provider value={{ ShopInfoState, ShopInfoDispatch }}>
      <ShopDetailPresenter
        onSubmit={onSubmit}
        loading={loading}
        data={data}
        error={error}
      />
    </ShopInfoContext.Provider>
  );
};
