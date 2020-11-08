import React, { useReducer } from "react";
import CreateProductPresenter from "./CreateProductPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { CREATE_PRODUCT, GET_PRODUCTINFO } from "./CreateProductQueries";
import { toast } from "react-toastify";
import putImagetoS3 from "./putImagetoS3";

export const ProductInfoContext = React.createContext(null);

const initialState = {
  BasicInformation: {
    productId: "-",
    productName: { value: "" },
    price: { value: 0 },
    externalLink: { value: "" },
    productImage: { File: "", PreviewUrl: "" },
  },
  BasicStatus: {
    TotalNumberofPosts: 0,
    RegistrationData: "--/--/----",
    LastUpdated: "--/--/--- --:--:--",
  },
  TagInformation: { value: [] },
  ProductDescription: { value: "" },
  SelectedShop: { shopId: 0, shopName: "", shopLink: null },
  BranchManagement: { value: [] },
  ShopData: [],
  CategoryData: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_BASICINFO":
      return { ...state, BasicInformation: action.data.BasicInformation };
    case "UPDATE_BASICSTATUS":
      return { ...state, BasicStatus: action.data.BasicStatus };
    case "UPDATE_TAGINFO":
      return { ...state, TagInformation: action.data.TagInformation };
    case "UPDATE_DESCRIPTION":
      return { ...state, ProductDescription: action.data.ProductDescription };
    case "UPDATE_SHOPINFO":
      return { ...state, SelectedShop: action.data.SelectedShop };
    case "UPDATE_BRANCH":
      return { ...state, BranchManagement: action.data.BranchManagement };
    case "UPDATE_BATCH":
      return action.data;
    default:
      return state;
  }
}

export default () => {
  const [ProductInfoState, ProductInfoDispatch] = useReducer(
    reducer,
    initialState
  );

  const { loading, error, data } = useQuery(GET_PRODUCTINFO);

  const [CreateProductMutation, { error: CreateError }] = useMutation(
    CREATE_PRODUCT
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(ProductInfoState);

    if (ProductInfoState.BasicInformation.productName.value === "") {
      toast.error("Please enter Product Name.");
      return;
    }
    if (ProductInfoState.BasicInformation.price.value === "") {
      toast.error("Please enter Product Price.");
      return;
    }
    if (isNaN(Number(ProductInfoState.BasicInformation.price.value))) {
      toast.error("Invalid Price Value.");
      return;
    }
    if (Number(ProductInfoState.BasicInformation.price.value) < 0) {
      toast.error("Price Value should be 0 and/or more.");
      return;
    }
    if (ProductInfoState.BasicInformation.productImage.File === "") {
      toast.error("Please add Product Image.");
      return;
    }
    if (
      ProductInfoState.BasicInformation.externalLink.value === "http://" ||
      ProductInfoState.BasicInformation.externalLink.value === "" ||
      ProductInfoState.BasicInformation.externalLink.value === "https://"
    ) {
      toast.error("Invalid Product Link URL.");
      return;
    }
    let TagOrderList = [];
    let TagIdList = [];
    let rtnTagList = [];
    let inputTagList = ProductInfoState.TagInformation.value;
    inputTagList.sort((a, b) => a.order - b.order);
    for (const eachTag of inputTagList) {
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
      rtnTagList.push(Number(eachTag.tagId));
    }
    if (ProductInfoState.BranchManagement.value.length === 0) {
      toast.error("Please select branch.");
      return;
    }
    let rtnShopImage = {
      File: ProductInfoState.BasicInformation.productImage.File,
      fileName: null,
    };
    const ShopImageType = rtnShopImage.File.type.substring(6);
    var TimeNumber = new Date();
    const ShopImageFileName = TimeNumber.getTime() + "." + ShopImageType;
    rtnShopImage.fileName = ShopImageFileName;

    const mutationData = {
      productName: ProductInfoState.BasicInformation.productName.value,
      price: Number(ProductInfoState.BasicInformation.price.value),
      productImage: rtnShopImage.fileName,
      description:
        ProductInfoState.ProductDescription.value === ""
          ? null
          : ProductInfoState.ProductDescription.value,
      externalLink: ProductInfoState.BasicInformation.externalLink.value,
      tags: rtnTagList,
      branchIds: ProductInfoState.BranchManagement.value,
    };

    console.log("Mutation Data : ", mutationData);

    const {
      data: { createProduct },
    } = await CreateProductMutation({
      variables: mutationData,
    });
    if (!createProduct || CreateError) {
      toast.error("Error occured while create data.");
      return;
    }

    if (createProduct) {
      const ProductId = createProduct.productId;
      try {
        await putImagetoS3({
          file: rtnShopImage.File,
          fileName: "Product/" + ProductId + "/" + rtnShopImage.fileName,
        });
      } catch (e) {
        toast.error("Error occured while create data.");
        return;
      }
      toast.success("Sucessfullly create Data!");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 5000);
      return;
    }
  };

  return (
    <ProductInfoContext.Provider
      value={{ ProductInfoState, ProductInfoDispatch }}
    >
      <CreateProductPresenter
        onSubmit={onSubmit}
        loading={loading}
        data={data}
        error={error}
      />
    </ProductInfoContext.Provider>
  );
};
