import React, { useReducer } from "react";
import TagListPresenter from "./TagListPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { GET_TAGLIST, DELETE_TAGS } from "./TagListQueries";
import { toast } from "react-toastify";

export const TagListContext = React.createContext(null);

const initialState = {
  selectedTagIdList: [],
  pageNum: 1,
  sortOption: {
    sortTagId: false,
    sortTagName: false,
    sortCategory: false,
    tagIdAsc: true,
    tagNameAsc: true,
    categoryAsc: true,
  },
  searchOption: {
    searchSelectBox: "tagId",
    searchKeyWord: "",
    searchItemBoolean: false,
    searchItem: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_PAGENUM":
      return { ...state, pageNum: action.data.pageNum };
    case "UPDATE_SEARCH":
      const { name, value } = action.data;
      if (name === "searchSelectBox") {
        return {
          ...state,
          searchOption: {
            ...state.searchOption,
            [name]: value,
            searchKeyWord: "",
            searchItemBoolean: false,
            searchItem: "",
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
    case "UPDATE_SORTOPTION":
      return {
        ...state,
        pageNum: 1,
        sortOption: action.data.sortOption,
      };
    case "UPDATE_SELECTTAG":
      if (state.selectedTagIdList.includes(action.data.tagId)) {
        let selectedTagIdList = state.selectedTagIdList.filter(
          (eachTagId) => eachTagId !== action.data.tagId
        );
        return { ...state, selectedTagIdList };
      } else {
        let selectedTagIdList = state.selectedTagIdList;
        selectedTagIdList.push(action.data.tagId);
        return { ...state, selectedTagIdList };
      }
    case "UPDATE_BATCH_SELECTTAG":
      return {
        ...state,
        selectedTagIdList: action.data.saveList,
      };
    case "UPDATE_SEARCHOPTION":
      return {
        selectedTagIdList: [],
        pageNum: 1,
        searchOption: action.data.searchOption,
        sortOption: {
          sortTagId: false,
          sortTagName: false,
          sortCategory: false,
          tagIdAsc: true,
          tagNameAsc: true,
          categoryAsc: true,
        },
      };
    default:
      return state;
  }
}

export default () => {
  const [tagState, tagDispatch] = useReducer(reducer, initialState);
  const [deleteTags, { error: mutationError }] = useMutation(DELETE_TAGS);
  const { loading, error, data } = useQuery(GET_TAGLIST, {
    variables: {
      pageNum: tagState.pageNum,
      tagId:
        tagState.searchOption.searchSelectBox === "tagId" &&
        tagState.searchOption.searchItemBoolean
          ? Number(tagState.searchOption.searchItem)
          : null,
      tagName:
        tagState.searchOption.searchSelectBox === "tagName" &&
        tagState.searchOption.searchItemBoolean
          ? tagState.searchOption.searchItem
          : null,
      category:
        tagState.searchOption.searchSelectBox === "category" &&
        tagState.searchOption.searchItemBoolean
          ? tagState.searchOption.searchItem
          : null,
      className:
        tagState.searchOption.searchSelectBox === "className" &&
        tagState.searchOption.searchItemBoolean
          ? tagState.searchOption.searchItem
          : null,
      tagIdAsc: tagState.sortOption.sortTagId
        ? tagState.sortOption.tagIdAsc
        : null,
      tagNameAsc: tagState.sortOption.sortTagName
        ? tagState.sortOption.tagNameAsc
        : null,
      categoryAsc: tagState.sortOption.sortCategory
        ? tagState.sortOption.categoryAsc
        : null,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (tagState.selectedTagIdList.length === 0) {
      toast.error("Please select at least one.");
      return;
    }

    const {
      data: { deleteSelectedTags },
    } = await deleteTags({
      variables: {
        tagIds: tagState.selectedTagIdList,
      },
    });

    console.log(deleteSelectedTags);

    if (!deleteSelectedTags || mutationError) {
      toast.error("Error occured while delete data.");
      return;
    }
    if (deleteSelectedTags) {
      toast.success("Sucessfully delete Data!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
      return;
    }
  };

  return (
    <TagListContext.Provider value={{ tagState, tagDispatch }}>
      <TagListPresenter
        loading={loading}
        data={data}
        error={error}
        onSubmit={onSubmit}
      />
    </TagListContext.Provider>
  );
};
