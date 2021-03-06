import React, { useReducer } from "react";
import SearchTagPresenter from "./SearchTagPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SETTING_POPULAR_TAGS, POPULAR_TAG_MUTATION } from "./SearchTagQueries";
import { toast } from "react-toastify";

export const SearchTagIconContext = React.createContext(null);

const initialState = {
  SearchTagRowData: [],
  isData: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return action.data;
    case "CREATE_TAG":
      return {
        SearchTagRowData: state.SearchTagRowData.concat(action.data),
        isData: true,
      };
    case "DELETE_TAG":
      return {
        SearchTagRowData: state.SearchTagRowData.filter(
          (eachTag) => eachTag.id !== action.data.id
        ),
        isData: true,
      };
    case "UPDATE_TAG":
      return {
        SearchTagRowData: state.SearchTagRowData.map((eachData) => {
          if (eachData.id === action.data.id) {
            return action.data;
          } else return eachData;
        }),
        isData: true,
      };
    default:
      return state;
  }
}

export default () => {
  const [searchTagState, searchTagDispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(SETTING_POPULAR_TAGS);
  const [updatePopularTag, { error: mutationError }] = useMutation(
    POPULAR_TAG_MUTATION
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    let orderArr = [],
      tagIdArr = [],
      mutationData = {
        popularTags: [],
      };

    if (searchTagState.SearchTagRowData.length < 1) {
      toast.error(
        "Recommendation Tag Page  : Please choose Recommendation Tag"
      );
      return;
    }
    for (const eachTag of searchTagState.SearchTagRowData) {
      if (orderArr.includes(eachTag.order)) {
        toast.error(
          "Recommendation Tag Page  : Order values should not be the same."
        );
        return;
      }
      if (isNaN(eachTag.order)) {
        toast.error("Invalid Price Value.");
        return;
      }
      if (eachTag.order === 0) {
        toast.error(
          "Recommendation Tag Page : Order values should be bigger than 0."
        );
        return;
      }
      if (tagIdArr.includes(eachTag.tagId)) {
        toast.error("Recommendation Tag Page : Tag should not be the same.");
        return;
      }
      if (
        eachTag.tagId === 0 ||
        eachTag.classId === 0 ||
        eachTag.category === "-- CHOOSE DATA --" ||
        eachTag.category === "-- LOADING --"
      ) {
        toast.error("Recommendation Tag Page : You have to choose value.");
        return;
      }
      orderArr.push(eachTag.order);
      tagIdArr.push(eachTag.tagId);
      mutationData.popularTags.push({
        tagId: eachTag.tagId,
        order: eachTag.order,
      });
    }

    const {
      data: { updateSettingPopularTags },
    } = await updatePopularTag({
      variables: { popularTags: mutationData.popularTags },
    });

    if (!updateSettingPopularTags || mutationError) {
      toast.error("Error occured while update data.");
      return;
    }
    if (updateSettingPopularTags) {
      toast.success("Sucessfullly Update Data!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
      return;
    }
  };

  return (
    <SearchTagIconContext.Provider
      value={{ searchTagDispatch, searchTagState }}
    >
      <SearchTagPresenter
        loading={loading}
        data={data}
        error={error}
        onSubmit={onSubmit}
      />
    </SearchTagIconContext.Provider>
  );
};
