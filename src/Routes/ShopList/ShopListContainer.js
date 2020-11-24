import React, { useReducer } from "react";
import ShopListPresenter from "./ShopListPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { GET_SHOPS, DELETE_SHOPS, UPDATE_SHOPS } from "./ShopListQueries";
import { toast } from "react-toastify";

export const ShopListContext = React.createContext(null);

const initialState = {
  WeightData: [],
  SelectedShopList: [],
  pageNum: 1,
  SortOption: {
    SortShopId: false,
    SortShopName: false,
    SortWeight: false,
    SortRank: false,
    shopIdAsc: true,
    ShopNameAsc: true,
    WeightAsc: true,
    RankAsc: true,
  },
  SearchOption: {
    SearchSelectBox: "ShopID",
    SearchKeyWord: "",
    SearchShopId: false,
    SearchShopName: false,
    SeacrchPhoneNumber: false,
    SearchAddress: false,
    SearchTag: false,
    ShopId: 0,
    ShopName: "",
    PhoneNumber: "",
    Address: "",
    Tag: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_PAGENUM":
      return { ...state, pageNum: action.data.pageNum };
    case "UPDATE_SORTOPTION":
      return { ...state, pageNum: 1, SortOption: action.data.SortOption };
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

    case "UPDATE_SEARCHOPTION":
      return {
        WeightData: [],
        SelectedShopList: [],
        pageNum: 1,
        SearchOption: action.data.SearchOption,
        SortOption: {
          SortShopId: false,
          SortShopName: false,
          SortWeight: false,
          SortRank: false,
          shopIdAsc: true,
          ShopNameAsc: true,
          WeightAsc: true,
          RankAsc: true,
        },
      };
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
    case "UPDATE_BATCH_WEIGHT":
      return { ...state, WeightData: action.data.WeightData };
    case "UPDATE_BATCH":
      return action.data;
    default:
      return state;
  }
}

export default () => {
  const [ShopListState, ShopListDispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(GET_SHOPS, {
    variables: {
      address: ShopListState.SearchOption.SearchAddress
        ? ShopListState.SearchOption.Address
        : null,
      pageNum: ShopListState.pageNum,
      phoneNumber: ShopListState.SearchOption.PhoneNumber
        ? ShopListState.SearchOption.PhoneNumber
        : null,
      shopId: ShopListState.SearchOption.SearchShopId
        ? ShopListState.SearchOption.ShopId
        : null,
      shopIdAsc: ShopListState.SortOption.SortShopId
        ? ShopListState.SortOption.shopIdAsc
        : null,
      shopName: ShopListState.SearchOption.SearchShopName
        ? ShopListState.SearchOption.ShopName
        : null,
      shopNameAsc: ShopListState.SortOption.SortShopName
        ? ShopListState.SortOption.ShopNameAsc
        : null,
      tagName: ShopListState.SearchOption.SearchTag
        ? ShopListState.SearchOption.Tag
        : null,
      weightAsc: ShopListState.SortOption.SortWeight
        ? ShopListState.SortOption.WeightAsc
        : null,
      rankAsc: ShopListState.SortOption.SortRank
        ? ShopListState.SortOption.RankAsc
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
