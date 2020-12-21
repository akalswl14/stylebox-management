import React, { useReducer } from "react";
import PostListPresenter from "./PostListPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { GET_POSTLIST, DELETE_POSTS, UPDATE_POSTS } from "./PostListQueries";
import { toast } from "react-toastify";
import queryString from "query-string";

export const PostListContext = React.createContext(null);

const initialState = {
  selectedPostIdList: [],
  pageNum: 1,
  searchOption: {
    searchSelectBox: "postId",
    searchKeyWord: "",
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
  const [postState, postDispatch] = useReducer(reducer, initialState);

  const [deletePosts, { error: mutationError }] = useMutation(DELETE_POSTS);
  const [updatePosts, { error: updateError }] = useMutation(UPDATE_POSTS);

  const queryInput = queryString.parse(location.search);

  const { loading, error, data } = useQuery(GET_POSTLIST, {
    variables: {
      pageNum: Number(queryInput.page),
      postId: isNaN(Number(queryInput.key_postid))
        ? null
        : Number(queryInput.key_postid),
      mainProductName: queryInput.key_productname ?? null,
      shopName: queryInput.key_shopname ?? null,
      postIdAsc:
        queryInput.sort_postid === undefined
          ? null
          : Number(queryInput.sort_postid) > 0
          ? false
          : true,
      mainProductNameAsc:
        queryInput.sort_productname === undefined
          ? null
          : Number(queryInput.sort_productname) > 0
          ? false
          : true,
      priceAsc:
        queryInput.sort_price === undefined
          ? null
          : Number(queryInput.sort_price) > 0
          ? false
          : true,
      shopNameAsc:
        queryInput.sort_shopname === undefined
          ? null
          : Number(queryInput.sort_shopname) > 0
          ? false
          : true,
      priorityAsc:
        queryInput.sort_priority === undefined
          ? null
          : Number(queryInput.sort_priority) > 0
          ? false
          : true,
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
          postIds: postState.selectedPostIdList,
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
        }, 1200);
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
        }, 1200);
        return;
      }
    }
  };

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
