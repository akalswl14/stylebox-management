import React, { useReducer } from "react";
import ShopListPresenter from "./ShopListPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { GET_SHOPS, DELETE_SHOPS, UPDATE_SHOPS } from "./ShopListQueries";
import { toast } from "react-toastify";
import queryString from "query-string";

export const ShopListContext = React.createContext(null);

const initialState = {
  WeightData: [],
  SelectedShopList: [],
  SearchOption: {
    SearchSelectBox: "ShopID",
    SearchKeyWord: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_SELECTSHOP":
      if (state.SelectedShopList.includes(action.data.shopId)) {
        let SelectedShopList = state.SelectedShopList.filter(
          (eachShopId) => eachShopId !== action.data.shopId
        );
        return { ...state, SelectedShopList };
      } else {
        let SelectedShopList = state.SelectedShopList;
        SelectedShopList.push(action.data.shopId);
        return { ...state, SelectedShopList };
      }
    case "UPDATE_BATCH_SELECTSHOP":
      return { ...state, SelectedShopList: action.data.BatchShopList };
    case "UPDATE_SEARCH_SELECTBOX":
      let SearchOption = {
        ...state.SearchOption,
        SearchSelectBox: action.data.SearchSelectBox,
      };
      return { ...state, SearchOption };

    case "UPDATE_SEARCH_KEYWORD":
      let UpdateSearchOption = {
        ...state.SearchOption,
        SearchKeyWord: action.data.SearchKeyWord,
      };
      return { ...state, SearchOption: UpdateSearchOption };
    case "UPDATE_WEIGHT":
      let IsNewData = true;
      let ReturnWeightData = state.WeightData.map((eachShop) => {
        if (eachShop.id === action.data.shopId) {
          IsNewData = false;
          return { id: action.data.shopId, value: action.data.value };
        }
        return eachShop;
      });
      if (IsNewData) {
        ReturnWeightData.push({
          id: action.data.shopId,
          value: action.data.value,
        });
      }
      return { ...state, WeightData: ReturnWeightData };
    case "UPDATE_BATCH":
      return action.data;
    default:
      return state;
  }
}

export default ({ location }) => {
  const [ShopListState, ShopListDispatch] = useReducer(reducer, initialState);

  const queryInput = queryString.parse(location.search);

  const { loading, error, data } = useQuery(GET_SHOPS, {
    variables: {
      address: queryInput.key_address ?? null,
      pageNum: Number(queryInput.page) ?? 1,
      phoneNumber: queryInput.key_phone ?? null,
      shopId: queryInput.key_shopid ? Number(queryInput.key_shopid) : null,
      shopIdAsc: queryInput.sort_shopid
        ? Number(queryInput.sort_shopid)
          ? false
          : true
        : null,
      shopName: queryInput.key_shopname ?? null,
      shopNameAsc: queryInput.sort_shopname
        ? Number(queryInput.sort_shopname)
          ? false
          : true
        : null,
      tagName: queryInput.key_tag ?? null,
      weightAsc: queryInput.sort_weight
        ? Number(queryInput.sort_weight)
          ? false
          : true
        : null,
      rankAsc: queryInput.sort_rank
        ? Number(queryInput.sort_rank)
          ? false
          : true
        : null,
    },
  });

  const [
    DeleteShopsMutation,
    { loading: DeleteLoading, error: DeleteError },
  ] = useMutation(DELETE_SHOPS);

  const [
    EditShopMutation,
    { loading: EditLoading, error: EditError },
  ] = useMutation(UPDATE_SHOPS);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (ShopListState.SelectedShopList <= 0) {
      toast.error("You have to choose 1 item at least.");
      return;
    }
    if (e.target.name === "DeleteButton") {
      const {
        data: { deleteShops },
      } = await DeleteShopsMutation({
        variables: {
          shopIds: ShopListState.SelectedShopList,
        },
      });
      if (!deleteShops || DeleteError) {
        toast.error("Error occured while delete data.");
        return;
      }
      if (deleteShops) {
        toast.success("Sucessfullly Delete Data!");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        return;
      }
    } else if (e.target.name === "EditButton") {
      let rtnShops = [];
      for (var i = 0; i < ShopListState.WeightData.length; i++) {
        let eachData = ShopListState.WeightData[i];
        if (isNaN(Number(eachData.value))) {
          toast.error("Weight Value should be number.");
          return;
        }
        ShopListState.WeightData[i].value = Number(eachData.value);
        eachData = ShopListState.WeightData[i];
        if (eachData.value < 0) {
          toast.error("Weight Value can't be smaller than 0.");
          return;
        }
        if (ShopListState.SelectedShopList.includes(eachData.id)) {
          rtnShops.push(eachData);
        }
      }
      const {
        data: { updateShops },
      } = await EditShopMutation({
        variables: {
          shops: rtnShops,
        },
      });
      if (!updateShops || EditError) {
        toast.error("Error occured while edit data.");
        return;
      }
      if (updateShops) {
        toast.success("Sucessfullly Edit Data!");
        setTimeout(() => {
          window.location.reload();
        }, 1200);
        return;
      }
    }
  };

  return (
    <ShopListContext.Provider value={{ ShopListState, ShopListDispatch }}>
      <ShopListPresenter
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        data={data}
      />
    </ShopListContext.Provider>
  );
};
