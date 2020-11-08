import React, { useReducer } from "react";
import UserListPresenter from "./UserListPresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import { GET_USERS, DELETE_USERS } from "./UserListQueries";
import { toast } from "react-toastify";

export const UserListContext = React.createContext(null);

const initialState = {
  SelectedUserList: [],
  pageNum: 1,
  SortOption: {
    SortUserId: false,
    SortInstallationDate: false,
    userIdAsc: true,
    installationDateAsc: true,
  },
  SearchOption: {
    SearchSelectBox: "UserID",
    SearchKeyWord: "",
    SearchUserId: false,
    userId: 0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_PAGENUM":
      return { ...state, pageNum: action.data.pageNum };
    case "UPDATE_SORTOPTION":
      return { ...state, pageNum: 1, SortOption: action.data.SortOption };
    case "UPDATE_SELECTUSER":
      if (state.SelectedUserList.includes(action.data.userId)) {
        let SelectedUserList = state.SelectedUserList.filter(
          (eachUserId) => eachUserId !== action.data.userId
        );
        return { ...state, SelectedUserList };
      } else {
        let SelectedUserList = state.SelectedUserList;
        SelectedUserList.push(action.data.userId);
        return { ...state, SelectedUserList };
      }
    case "UPDATE_BATCH_SELECTUSER":
      return { ...state, SelectedUserList: action.data.BatchUserList };
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
        SelectedUserList: [],
        pageNum: 1,
        SearchOption: action.data.SearchOption,
        SortOption: {
          SortUserId: false,
          SortInstallationDate: false,
          userIdAsc: true,
          installationDateAsc: true,
        },
      };
    default:
      return state;
  }
}

export default () => {
  const [UserListState, UserListDispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      pageNum: UserListState.pageNum,
      userId: UserListState.SearchOption.SearchUserId
        ? UserListState.SearchOption.userId
        : null,
      userIdAsc: UserListState.SortOption.SortUserId
        ? UserListState.SortOption.userIdAsc
        : null,
      installationDateAsc: UserListState.SortOption.SortInstallationDate
        ? UserListState.SortOption.installationDateAsc
        : null,
    },
  });
  const [DeleteUsersMutation, { error: mutationError }] = useMutation(
    DELETE_USERS
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (UserListState.SelectedUserList <= 0) {
      toast.error("You have to choose 1 item at least.");
      return;
    }
    const {
      data: { deleteUsers },
    } = await DeleteUsersMutation({
      variables: {
        userIds: UserListState.SelectedUserList,
      },
    });
    if (!deleteUsers || mutationError) {
      toast.error("Error occured while update data.");
      return;
    }
    if (deleteUsers) {
      toast.success("Sucessfullly Update Data!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      return;
    }
  };

  return (
    <UserListContext.Provider value={{ UserListState, UserListDispatch }}>
      <UserListPresenter
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        data={data}
      />
    </UserListContext.Provider>
  );
};
