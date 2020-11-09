import React, { useReducer } from "react";
import PostInfoPresenter from "./PostInfoPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { CATEGORY_OPTION, GET_LINKTYPE, GET_POST } from "./PostInfoQueries";
import { toast } from "react-toastify";

export const PostInfoContext = React.createContext(null);

const initialState = {
  basicInfo: {},
  basicStatus: {},
  tagInfo: [],
  externalLink: [],
  postImageManagement: [],
  postVideoManagement: [],
  postDescription: "",
  subProductManagement: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        basicInfo: action.data.basicInfo,
      };
    default:
      return state;
  }
}

export default () => {
  const [postState, postDispatch] = useReducer(reducer, initialState);
  //   const { loading, error, data } = useQuery(GET_POST, {
  //     variables: { id: 45 },
  //   });

  const {
    loading: loading_CategoryData,
    error: error_CategoryData,
    data: data_CategoryData,
  } = useQuery(CATEGORY_OPTION);

  const {
    loading: loading_LinkTypeData,
    error: error_LinkTypeData,
    data: data_LinkTypeData,
  } = useQuery(GET_LINKTYPE);

  console.log(postState);

  return (
    <PostInfoContext.Provider value={{ postState, postDispatch }}>
      <PostInfoPresenter
        // loading={loading}
        // data={data}
        // error={error}
        loading_CategoryData={loading_CategoryData}
        error_CategoryData={error_CategoryData}
        data_CategoryData={data_CategoryData}
        loading_LinkTypeData={loading_LinkTypeData}
        error_LinkTypeData={error_LinkTypeData}
        data_LinkTypeData={data_LinkTypeData}
      />
    </PostInfoContext.Provider>
  );
};
