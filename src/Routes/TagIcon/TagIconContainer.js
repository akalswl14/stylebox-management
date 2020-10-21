import React, { useReducer } from "react";
import TagIconPresenter from "./TagIconPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  TAGICON_SETTING,
  CATEGORY_OPTION,
  UPDATE_TAGICON,
} from "./TagIconQueries";
import { toast } from "react-toastify";

export const TagIconContext = React.createContext(null);

const initialState = {
  MainIconRowData: [],
  BestIconRowData: [],
  ShopIconRowData: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      console.log("Setting Context Data to THIS");
      console.log(action.data);
      return action.data;
    case "CREATE_MAINTAG":
      return {
        ...state,
        MainIconRowData: state.MainIconRowData.concat(action.data),
      };
    case "DELETE_MAINTAG":
      return {
        ...state,
        MainIconRowData: state.MainIconRowData.filter(
          (eachTag) => eachTag.id !== action.data.id
        ),
      };
    case "UPDATE_MAINTAG":
      console.log("Update MainTag Data");
      return {
        ...state,
        MainIconRowData: state.MainIconRowData.map((eachData) => {
          if (eachData.id == action.data.id) {
            return action.data;
          } else return eachData;
        }),
      };
    case "CREATE_BESTTAG":
      return {
        ...state,
        BestIconRowData: state.BestIconRowData.concat(action.data),
      };
    case "DELETE_BESTTAG":
      return {
        ...state,
        BestIconRowData: state.BestIconRowData.filter(
          (eachTag) => eachTag.id !== action.data.id
        ),
      };
    case "UPDATE_BESTTAG":
      console.log("Update BestTag Data");
      return {
        ...state,
        BestIconRowData: state.BestIconRowData.map((eachData) => {
          if (eachData.id == action.data.id) {
            return action.data;
          } else return eachData;
        }),
      };
    case "CREATE_SHOPTAG":
      return {
        ...state,
        ShopIconRowData: state.ShopIconRowData.concat(action.data),
      };
    case "DELETE_SHOPTAG":
      return {
        ...state,
        ShopIconRowData: state.ShopIconRowData.filter(
          (eachTag) => eachTag.id !== action.data.id
        ),
      };
    case "UPDATE_SHOPTAG":
      console.log("Update ShopTag Data");
      return {
        ...state,
        ShopIconRowData: state.ShopIconRowData.map((eachData) => {
          if (eachData.id == action.data.id) {
            return action.data;
          } else return eachData;
        }),
      };
    default:
      return state;
  }
}

export default () => {
  const [TagIconState, TagIconDispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(TAGICON_SETTING);
  const {
    loading: loading_CategoryData,
    error: error_CategoryData,
    data: data_CategoryData,
  } = useQuery(CATEGORY_OPTION);
  const [
    updateTagIcon,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_TAGICON);
  const onSubmit = async (e) => {
    e.preventDefault();
    let orderArr = [],
      tagIdArr = [],
      mutationData = {
        mainBubbleTags: [],
        bestBubbleTags: [],
        shopBubbleTags: [],
      };
    for (const eachTag of TagIconState.MainIconRowData) {
      if (orderArr.includes(eachTag.order)) {
        toast.error(
          "Main Page Tag Icon : Order values should not be the same."
        );
        return;
      }
      if (eachTag.order === 0) {
        toast.error(
          "Main Page Tag Icon : Order values should be bigger than 0."
        );
      }
      if (tagIdArr.includes(eachTag.tagId)) {
        toast.error("Main Page Tag Icon : Tag should not be the same.");
        return;
      }
      if (
        eachTag.tagId === 0 ||
        eachTag.classId === 0 ||
        eachTag.category === "-- CHOOSE DATA --" ||
        eachTag.category === "-- LOADING --"
      ) {
        toast.error("Main Page Tag Icon : You have to choose value.");
        return;
      }
      orderArr.push(eachTag.order);
      tagIdArr.push(eachTag.tagId);
      mutationData.mainBubbleTags.push({
        id: eachTag.tagId,
        order: eachTag.order,
      });
    }
    orderArr = [];
    tagIdArr = [];
    for (const eachTag of TagIconState.BestIconRowData) {
      if (orderArr.includes(eachTag.order)) {
        toast.error(
          "Best Page Tag Icon : Order values should not be the same."
        );
        return;
      }
      if (eachTag.order === 0) {
        toast.error(
          "Best Page Tag Icon : Order values should be bigger than 0."
        );
      }
      if (tagIdArr.includes(eachTag.tagId)) {
        toast.error("Best Page Tag Icon : Tag should not be the same.");
        return;
      }
      if (
        eachTag.tagId === 0 ||
        eachTag.classId === 0 ||
        eachTag.category === "-- CHOOSE DATA --" ||
        eachTag.category === "-- LOADING --"
      ) {
        toast.error("Best Page Tag Icon : You have to choose value.");
        return;
      }
      orderArr.push(eachTag.order);
      tagIdArr.push(eachTag.tagId);
      mutationData.bestBubbleTags.push({
        id: eachTag.tagId,
        order: eachTag.order,
      });
    }
    orderArr = [];
    tagIdArr = [];
    for (const eachTag of TagIconState.ShopIconRowData) {
      if (orderArr.includes(eachTag.order)) {
        toast.error(
          "Shop Page Tag Icon : Order values should not be the same."
        );
        return;
      }
      if (eachTag.order === 0) {
        toast.error(
          "Shop Page Tag Icon : Order values should be bigger than 0."
        );
      }
      if (tagIdArr.includes(eachTag.tagId)) {
        toast.error("Shop Page Tag Icon : Tag should not be the same.");
        return;
      }
      if (
        eachTag.tagId === 0 ||
        eachTag.classId === 0 ||
        eachTag.category === "-- CHOOSE DATA --" ||
        eachTag.category === "-- LOADING --"
      ) {
        toast.error("Shop Page Tag Icon : You have to choose value.");
        return;
      }
      orderArr.push(eachTag.order);
      tagIdArr.push(eachTag.tagId);
      mutationData.shopBubbleTags.push({
        id: eachTag.tagId,
        order: eachTag.order,
      });
    }
    console.log(mutationData);
    const {
      data: { updateSettingBubbles },
    } = await updateTagIcon({
      variables: {
        mainBubbleTags: mutationData.mainBubbleTags,
        bestBubbleTags: mutationData.bestBubbleTags,
        shopBubbleTags: mutationData.shopBubbleTags,
      },
    });
    if (!updateSettingBubbles || mutationError) {
      toast.error("Error occured while update data.");
      return;
    }
    if (updateSettingBubbles) {
      toast.success("Sucessfullly Update Data!");
      return;
    }
  };

  return (
    <TagIconContext.Provider value={{ TagIconDispatch, TagIconState }}>
      <TagIconPresenter
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        data={data}
        loading_CategoryData={loading_CategoryData}
        error_CategoryData={error_CategoryData}
        data_CategoryData={data_CategoryData}
      />
    </TagIconContext.Provider>
  );
};
