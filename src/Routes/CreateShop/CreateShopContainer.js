import React, { useReducer } from "react";
import CreateShopPresenter from "./CreateShopPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  CREATE_SHOP,
  CATEGORY_OPTION,
  GET_LINKTYPE,
} from "./CreateShopQueries";
import { toast } from "react-toastify";

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

  //   const { loading, error, data } = useQuery(CREATE_SHOP, {
  //     variables: {
  //       shopName: ShopInfoState.BasicInformation.shopName,
  // logoUrl:ShopInfoState.BasicInformation.ShopLogoFile,
  // phoneNumber: ShopInfoState.BasicInformation.phoneNumber,
  // mainBranchAddress: ShopInfoState.BasicInformation.MainAddress,
  // mainBranchMapUrl: ShopInfoState.BasicInformation.MainMapUrl,
  // weight: ShopInfoState.BasicStatus.weight,
  // tags: ShopInfoState.TagInformation,
  // FacebookLink: ShopInfoState.SocialMediaLink.FacebookLink === "" ? null : ShopInfoState.SocialMediaLink.FacebookLink,
  // InstagramLink: ShopInfoState.SocialMediaLink.InstagramLink === "" ? null : ShopInfoState.SocialMediaLink.InstagramLink,
  // YoutubeLink: ShopInfoState.SocialMediaLink.YoutubeLink === "" ? null : ShopInfoState.SocialMediaLink.YoutubeLink,
  // externalLinks: ShopInfoState.ExternalLink,
  // shopImages: ShopInfoState.ShopImagesManagement,
  // shopVideos: ShopInfoState.ShopVideoManagement,
  // description: ShopInfoState.ShopDescription === "" ? null : ShopInfoState.ShopDescription,
  // branches: ShopInfoState.BranchManagement
  //     },
  //   });

  const [
    CreateShopMutaion,
    { loading: CreateLoading, error: CreateError },
  ] = useMutation(CREATE_SHOP);

  const onSubmit = async (e) => {
    e.preventDefault();
    // if (ShopListState.SelectedShopList <= 0) {
    //   toast.error("You have to choose 1 item at least.");
    //   return;
    // }
    // if (e.target.name === "EditButton") {
    //   let rtnShops = [];
    //   for (var i = 0; i < ShopListState.WeightData.length; i++) {
    //     let eachData = ShopListState.WeightData[i];
    //     if (isNaN(Number(eachData.value))) {
    //       toast.error("Weight Value should be number.");
    //       return;
    //     }
    //     ShopListState.WeightData[i].value = Number(eachData.value);
    //     eachData = ShopListState.WeightData[i];
    //     if (eachData.value < 0) {
    //       toast.error("Weight Value can't be smaller than 0.");
    //       return;
    //     }
    //     if (ShopListState.SelectedShopList.includes(eachData.id)) {
    //       rtnShops.push(eachData);
    //     }
    //   }
    //   const {
    //     data: { updateShops },
    //   } = await EditShopMutation({
    //     variables: {
    //       shops: rtnShops,
    //     },
    //   });
    //   if (!updateShops || EditError) {
    //     toast.error("Error occured while edit data.");
    //     return;
    //   }
    //   if (updateShops) {
    //     toast.success("Sucessfullly Edit Data!");
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 5000);
    //     return;
    //   }
    // }
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
