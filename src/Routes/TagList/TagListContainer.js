import React, { useReducer } from "react";
import TagListPresenter from "./TagListPresenter";
import { useQuery } from "react-apollo-hooks";
import { GET_TAGLIST } from "./TagListQueries";

export const TagListContext = React.createContext(null);

const initialState = {
  TagListData: [],
  TagSearchItem: {},
  TagSearchKind: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return action.data;
    case "CHANGE_SEARCH":
      return {
        ...state,
        TagSearchItem: {
          [action.name]: action.value,
        },
      };
    case "CHANGE_SEARCH_KIND":
      return {
        ...state,
        TagSearchKind: {
          [action.name]: action.value,
        },
      };
    default:
      return state;
  }
}

export default () => {
  const [tagState, tagDispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(GET_TAGLIST);
  console.log(tagState);
  return (
    <TagListContext.Provider value={{ tagState, tagDispatch }}>
      <TagListPresenter loading={loading} data={data} error={error} />
    </TagListContext.Provider>
  );
};
