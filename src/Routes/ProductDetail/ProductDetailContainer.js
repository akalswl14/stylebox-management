import React, { useReducer } from "react";
import ProductDetailPresenter from "./ProductDetailPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { GET_PRODUCT, UPDATE_PRODUCT } from "./ProductDetailQueries";
import { toast } from "react-toastify";
import putImagetoS3 from "./putImagetoS3";
import deleteImagefromS3 from "./deleteImagefromS3";
import { GET_TAGS_BYSHOP } from "../CreateProduct/CreateProductQueries";

export const ProductInfoContext = React.createContext(null);

const initialState = {
  BasicInformation: {
    productId: "-",
    productName: { value: "", isChange: false },
    price: { value: 0, isChange: false },
    externalLink: { value: "", isChange: false },
    productImage: { File: "", PreviewUrl: "", isChange: false, s3Key: null },
  },
  BasicStatus: {
    TotalNumberofPosts: 0,
    RegistrationData: "--/--/----",
    LastUpdated: "--/--/--- --:--:--",
  },
  TagInformation: { value: [], isChange: false },
  ProductDescription: { value: "", isChange: false },
  SelectedShop: { shopId: 0, shopName: "", shopLink: null },
  BranchManagement: { value: [], isChange: false },
  ShopData: [],
  CategoryData: [],
  DeleteImageKey: null,
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

export default ({ match }) => {
  const productId = Number(match.params.productId);
  const [ProductInfoState, ProductInfoDispatch] = useReducer(
    reducer,
    initialState
  );

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { productId },
  });

  const [UpdateProductMutation, { error: UpdateError }] = useMutation(
    UPDATE_PRODUCT
  );

  const [
    getTagbyShop,
    { error: getTagError, loading: getTagLoading },
  ] = useMutation(GET_TAGS_BYSHOP);

  const onSubmit = async (e) => {
    e.preventDefault();

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
    // if (ProductInfoState.BasicInformation.productImage.File === "") {
    //   toast.error("Please add Product Image.");
    //   return;
    // }
    if (
      ProductInfoState.BasicInformation.externalLink.value === "http://" ||
      ProductInfoState.BasicInformation.externalLink.value === "" ||
      ProductInfoState.BasicInformation.externalLink.value === "https://"
    ) {
      toast.error("Invalid Product Link URL.");
      return;
    }
    let rtnTagList = [];
    let inputTagList = ProductInfoState.TagInformation.value;
    if (inputTagList.length > 20) {
      toast.error("Up to 10 Tags can be registered.");
      return;
    }
    for (const eachTag of inputTagList) {
      if (
        Number(eachTag.tagId) === 0 ||
        Number(eachTag.classId) === 0 ||
        eachTag.category === "-- CHOOSE DATA --" ||
        eachTag.category === "-- LOADING --"
      ) {
        toast.error("Please choose Tag.");
        return;
      }
      if (rtnTagList.includes(Number(eachTag.tagId))) {
        toast.error("Tag should not be the same.");
        return;
      }
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
    if (
      ProductInfoState.BasicInformation.productImage.File !== "" &&
      ProductInfoState.BasicInformation.productImage.File
    ) {
      const ShopImageType = rtnShopImage.File.type.substring(6);
      var TimeNumber = new Date();
      const ShopImageFileName =
        "Product/" +
        productId +
        "/" +
        TimeNumber.getTime() +
        "." +
        ShopImageType;
      rtnShopImage.fileName = ShopImageFileName;
    }

    const mutationData = {
      productId,
      productName: ProductInfoState.BasicInformation.productName.isChange
        ? ProductInfoState.BasicInformation.productName.value
        : null,
      price: ProductInfoState.BasicInformation.price.isChange
        ? Number(ProductInfoState.BasicInformation.price.value)
        : null,
      isProductImageChange:
        ProductInfoState.BasicInformation.productImage.isChange,
      productImage: rtnShopImage.fileName,
      isDescriptionChange: ProductInfoState.ProductDescription.isChange,
      description:
        ProductInfoState.ProductDescription.value === ""
          ? null
          : ProductInfoState.ProductDescription.value,
      externalLink: ProductInfoState.BasicInformation.externalLink.isChange
        ? ProductInfoState.BasicInformation.externalLink.value
        : null,
      tags: ProductInfoState.TagInformation.isChange ? rtnTagList : null,
      branchIds: ProductInfoState.BranchManagement.isChange
        ? ProductInfoState.BranchManagement.value
        : null,
    };

    const {
      data: { updateProduct },
    } = await UpdateProductMutation({
      variables: mutationData,
    });
    if (!updateProduct || UpdateError) {
      toast.error("Error occured while update data.");
      return;
    }

    if (updateProduct) {
      try {
        if (rtnShopImage.fileName) {
          await putImagetoS3({
            file: rtnShopImage.File,
            fileName: rtnShopImage.fileName,
          });
        }
      } catch (e) {
        toast.error("Error occured while update data.");
        return;
      }
      try {
        if (ProductInfoState.DeleteImageKey) {
          await deleteImagefromS3({ keys: [ProductInfoState.DeleteImageKey] });
        }
      } catch (e) {
        toast.error("Error occured while update data.");
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
    <ProductInfoContext.Provider
      value={{ ProductInfoState, ProductInfoDispatch }}
    >
      <ProductDetailPresenter
        onSubmit={onSubmit}
        loading={loading}
        data={data}
        error={error}
        tagMutation={getTagbyShop}
        tagMutationError={getTagError}
        tagMutationLoading={getTagLoading}
      />
    </ProductInfoContext.Provider>
  );
};
