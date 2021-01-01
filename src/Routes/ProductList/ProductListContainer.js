import React, { useReducer } from "react";
import ProductListPresenter from "./ProductListPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  GET_PRODUCTLIST,
  DELETE_PRODUCTS,
  UPDATE_PRODUCTS,
} from "./ProductListQueries";
import { toast } from "react-toastify";
import queryString from "query-string";

export const ProductListContext = React.createContext(null);

const initialState = {
  selectedProductIdList: [],
  pageNum: 1,
  searchOption: {
    searchSelectBox: "productId",
    searchKeyWord: "",
  },
  productInfo: [],
  confirmButton: "delete",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        productInfo: action.data.productInfo,
      };
    case "UPDATE_PRODUCT_PRICE":
      let productInfo = state.productInfo.map((eachProduct) =>
        eachProduct.productId === action.data.productId
          ? { ...eachProduct, price: Number(action.data.value) }
          : eachProduct
      );
      return {
        ...state,
        productInfo,
      };
    case "UPDATE_SEARCH":
      const { name, value } = action.data;
      if (name === "searchSelectBox") {
        return {
          ...state,
          searchOption: {
            [name]: value,
            searchKeyWord: "",
          },
        };
      }
      return {
        ...state,
        searchOption: {
          ...state.searchOption,
          [name]: value,
        },
      };
    case "UPDATE_SELECTPRODCT":
      if (state.selectedProductIdList.includes(action.data.productId)) {
        let selectedProductIdList = state.selectedProductIdList.filter(
          (eachProductId) => eachProductId !== action.data.productId
        );
        return { ...state, selectedProductIdList };
      } else {
        let selectedProductIdList = state.selectedProductIdList;
        selectedProductIdList.push(action.data.productId);
        return { ...state, selectedProductIdList };
      }
    case "UPDATE_BATCH_SELECTPRODCT":
      return {
        ...state,
        selectedProductIdList: action.data.saveList,
      };
    case "UPDATE_SEARCHOPTION":
      return {
        ...state,
        selectedProductIdList: [],
        pageNum: 1,
        searchOption: action.data.searchOption,
        sortOption: {
          sortProductId: false,
          sortProductName: false,
          sortPrice: false,
          productIdAsc: true,
          productNameAsc: true,
          priceAsc: true,
        },
      };
    case "CHANGE_BUTTON":
      return {
        ...state,
        confirmButton: action.data.buttonKind,
      };
    default:
      return state;
  }
}

export default ({ location }) => {
  const [productState, productDispatch] = useReducer(reducer, initialState);
  const [deleteProducts, { error: mutationError }] = useMutation(
    DELETE_PRODUCTS
  );
  const [updateProducts, { error: updateError }] = useMutation(UPDATE_PRODUCTS);
  const queryInput = queryString.parse(location.search);

  const { loading, error, data } = useQuery(GET_PRODUCTLIST, {
    variables: {
      pageNum: Number(queryInput.page),
      productId: queryInput.id ? Number(queryInput.id) : null,
      productName: queryInput.productname ?? null,
      shopName: queryInput.shopname ?? null,
      productIdAsc:
        queryInput.sortid === undefined
          ? null
          : Number(queryInput.sortid) > 0
          ? false
          : true,
      productNameAsc:
        queryInput.sortname === undefined
          ? null
          : Number(queryInput.sortname) > 0
          ? false
          : true,
      priceAsc:
        queryInput.sortprice === undefined
          ? null
          : Number(queryInput.sortprice) > 0
          ? false
          : true,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (productState.confirmButton === "delete") {
      if (productState.selectedProductIdList.length === 0) {
        toast.error("Please select at least one.");
        return;
      }

      const {
        data: { deleteProductList },
      } = await deleteProducts({
        variables: {
          productIds: productState.selectedProductIdList,
        },
      });

      if (!deleteProductList || mutationError) {
        toast.error("Error occured while delete data.");
        return;
      }
      if (deleteProductList) {
        toast.success("Sucessfully Delete Data!");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        return;
      }
    }

    if (productState.confirmButton === "edit") {
      let products = [];
      for (const id of productState.selectedProductIdList) {
        for (const eachData of productState.productInfo) {
          if (isNaN(Number(eachData.price))) {
            toast.error("Invalid Price Value.");
            return;
          }
          if (id === eachData.productId) {
            products.push({
              id: id,
              price: eachData.price,
            });
          }
        }
      }
      if (products.length === 0) {
        toast.error("Please edit at least one.");
        return;
      }
      const {
        data: { updateProductList },
      } = await updateProducts({
        variables: { products },
      });
      if (!updateProductList || updateError) {
        toast.error("Error occured while edit data.");
        return;
      }
      if (updateProductList) {
        toast.success("Sucessfully Edit Data!");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        return;
      }
    }
  };

  return (
    <ProductListContext.Provider value={{ productState, productDispatch }}>
      <ProductListPresenter
        loading={loading}
        data={data}
        error={error}
        onSubmit={onSubmit}
      />
    </ProductListContext.Provider>
  );
};
