import React, { useReducer } from "react";
import PostListPresenter from "./PostListPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { GET_POSTLIST, DELETE_POSTS, UPDATE_POSTS } from "./PostListQueries";
import { toast } from "react-toastify";

export const PostListContext = React.createContext(null);

const initialState = {
  selectedPostIdList: [],
  pageNum: 1,
  sortOption: {
    sortPostId: false,
    sortMainProductName: false,
    sortShopName: false,
    sortPrice: false,
    sortPriority: false,
    postIdAsc: true,
    mainProductNameAsc: true,
    shopNameAsc: true,
    priceAsc: true,
    priorityAsc: true,
  },
  searchOption: {
    searchSelectBox: "postId",
    searchKeyWord: "",
    searchItemBoolean: false,
    searchItem: "",
  },
  postInfo: [],
  confirmButton: "delete",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        postInfo: action.data.postInfo,
      };
    case "UPDATE_POST_PRIORITY":
      let postInfo = state.postInfo.map((eachPost) =>
        eachPost.postId === action.data.postId
          ? { ...eachPost, priority: Number(action.data.value) }
          : eachPost
      );
      return {
        ...state,
        postInfo,
      };
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
    case "UPDATE_SELECTPOST":
      if (state.selectedPostIdList.includes(action.data.postId)) {
        let selectedPostIdList = state.selectedPostIdList.filter(
          (eachPostId) => eachPostId !== action.data.postId
        );
        return { ...state, selectedPostIdList };
      } else {
        let selectedPostIdList = state.selectedPostIdList;
        selectedPostIdList.push(action.data.postId);
        return { ...state, selectedPostIdList };
      }
    case "UPDATE_BATCH_SELECTPOST":
      return {
        ...state,
        selectedPostIdList: action.data.saveList,
      };
    case "UPDATE_SEARCHOPTION":
      return {
        ...state,
        selectedPostIdList: [],
        pageNum: 1,
        searchOption: action.data.searchOption,
        sortOption: {
          sortPostId: false,
          sortMainProductName: false,
          sortShopName: false,
          sortPrice: false,
          sortPriority: false,
          postIdAsc: true,
          mainProductNameAsc: true,
          shopNameAsc: true,
          priceAsc: true,
          priorityAsc: true,
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

export default () => {
  const [postState, postDispatch] = useReducer(reducer, initialState);

  const [deletePosts, { error: mutationError }] = useMutation(DELETE_POSTS);
  const [updatePosts, { error: updateError }] = useMutation(UPDATE_POSTS);

  const { loading, error, data } = useQuery(GET_POSTLIST, {
    variables: {
      pageNum: postState.pageNum,
      postId:
        postState.searchOption.searchSelectBox === "postId" &&
        postState.searchOption.searchItemBoolean
          ? Number(postState.searchOption.searchItem)
          : null,
      mainProductName:
        postState.searchOption.searchSelectBox === "mainProductName" &&
        postState.searchOption.searchItemBoolean
          ? postState.searchOption.searchItem
          : null,
      shopName:
        postState.searchOption.searchSelectBox === "shopName" &&
        postState.searchOption.searchItemBoolean
          ? postState.searchOption.searchItem
          : null,
      postIdAsc: postState.sortOption.sortPostId
        ? postState.sortOption.postIdAsc
        : null,
      mainProductNameAsc: postState.sortOption.sortMainProductName
        ? postState.sortOption.mainProductNameAsc
        : null,
      priceAsc: postState.sortOption.sortPrice
        ? postState.sortOption.priceAsc
        : null,
      shopNameAsc: postState.sortOption.sortShopName
        ? postState.sortOption.shopNameAsc
        : null,
      priorityAsc: postState.sortOption.sortPriority
        ? postState.sortOption.priorityAsc
        : null,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (postState.confirmButton === "delete") {
      if (postState.selectedPostIdList.length === 0) {
        toast.error("Please select at least one.");
        return;
      }
      const {
        data: { deletePostList },
      } = await deletePosts({
        variables: {
          productIds: postState.selectedPostIdList,
        },
      });

      if (!deletePostList || mutationError) {
        toast.error("Error occured while delete data.");
        return;
      }
      if (deletePostList) {
        toast.success("Sucessfully Delete Data!");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
        return;
      }
    }

    if (postState.confirmButton === "edit") {
      let posts = [];
      for (const id of postState.selectedPostIdList) {
        for (const eachData of postState.postInfo) {
          if (id === eachData.postId) {
            posts.push({
              id: id,
              priority: eachData.priority,
            });
          }
        }
      }
      if (posts.length === 0) {
        toast.error("Please edit at least one.");
        return;
      }
      const {
        data: { updatePostList },
      } = await updatePosts({
        variables: { posts },
      });
      if (!updatePostList || updateError) {
        toast.error("Error occured while edit data.");
        return;
      }
      if (updatePostList) {
        toast.success("Sucessfully Edit Data!");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
        return;
      }
    }
  };

  console.log(postState);

  return (
    <PostListContext.Provider value={{ postState, postDispatch }}>
      <PostListPresenter
        loading={loading}
        data={data}
        error={error}
        onSubmit={onSubmit}
      />
    </PostListContext.Provider>
  );
};
