import React, { useReducer } from "react";
import TagListPresenter from "./TagListPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { GET_TAGLIST, DELETE_TAGS } from "./TagListQueries";
import { toast } from "react-toastify";
import queryString from "query-string";

export const TagListContext = React.createContext(null);

const initialState = {
  selectedTagIdList: [],
  pageNum: 1,
  searchOption: {
    searchSelectBox: "tagId",
    searchKeyWord: "",
    searchItemBoolean: false,
    searchItem: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default ({ location }) => {
  const [tagState, tagDispatch] = useReducer(reducer, initialState);
  const [deleteTags, { error: mutationError }] = useMutation(DELETE_TAGS);
  const queryInput = queryString.parse(location.search);

  const { loading, error, data } = useQuery(GET_TAGLIST, {
    variables: {
      pageNum: Number(queryInput.page),
      tagId: isNaN(Number(queryInput.id)) ? Number(queryInput.id) : null,
      tagName: queryInput.tagname ? queryInput.tagname : null,
      category: queryInput.category ? queryInput.category : null,
      className: queryInput.classname ? queryInput.classname : null,
      tagIdAsc:
        queryInput.sorttagidasc === undefined
          ? null
          : Number(queryInput.sorttagidasc) > 0
          ? false
          : true,
      tagNameAsc:
        queryInput.sorttagnameasc === undefined
          ? null
          : Number(queryInput.sorttagnameasc) > 0
          ? false
          : true,
      categoryAsc:
        queryInput.sortcategoryasc === undefined
          ? null
          : Number(queryInput.sortcategoryasc) > 0
          ? false
          : true,
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
