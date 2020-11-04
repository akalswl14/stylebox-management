import React, { useContext } from "react";
import { useQuery } from "react-apollo-hooks";
import { TagInfoContext } from "./TagInfoContainer";
import { GET_CLASS } from "./TagInfoQueries";

const TagTdTable = ({ category }) => {
  const { tagDispatch, tagState } = useContext(TagInfoContext);

  if (!category) category = "Style";

  const { loading: classLoading, data: classData } = useQuery(GET_CLASS, {
    variables: { category },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    tagDispatch({
      type: "TAGINFO_CHANGE",
      data: {
        name,
        value,
      },
    });
  };

  if (!classLoading && classData) {
    return (
      <select
        name="classId"
        value={tagState.tagInfo.classId}
        onChange={onChange}
      >
        {tagState.tagInfo.classId === 0 ? (
          <option>{"-- CHOOSE --"}</option>
        ) : (
          <></>
        )}
        {tagState.tagInfo.category !== "" ? (
          classData.getClassOptions.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))
        ) : (
          <></>
        )}
      </select>
    );
  } else {
    return <option>{"-- LOADING --"}</option>;
  }
};

export default TagTdTable;
