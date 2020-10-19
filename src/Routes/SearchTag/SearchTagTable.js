import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_CLASS, GET_TAG } from "./SearchTagQueries";

const SearchTagTable = ({
  order,
  id,
  tagName,
  Category,
  className,
  classId,
  categories,
  searchTag,
}) => {
  const [classState, setclassState] = useState(Category);
  const [tagState, setTagState] = useState(Number(classId));

  const { loading: classLoading, data: classData } = useQuery(GET_CLASS, {
    variables: { category: classState },
  });
  const { loading: tagLoading, data: tagData } = useQuery(GET_TAG, {
    variables: { classId: tagState },
  });

  const TagCategories = categories.filter(
    (category) => category !== "ShopName"
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    console.log(value);
    console.log(name);
    if (name === "category") {
      setclassState(value);
    }
    if (name === "classInfo") {
      setTagState(Number(value));
    }
  };

  if (classLoading || tagLoading)
    return (
      <tr>
        <td>
          <input name="order" type="text" value={order} />
        </td>
        <td>
          <select name="category"></select>
        </td>
        <td>
          <select name="classInfo"></select>
        </td>
        <td>
          <select name="tagInfo" value={id}></select>
        </td>
        <td>x</td>
      </tr>
    );

  if (!classLoading && classData && tagData) {
    return (
      <tr>
        <td>
          <input name="order" type="text" value={order} />
        </td>
        <td>
          <select name="category" value={classState} onChange={onChange}>
            {TagCategories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </td>
        <td>
          <select name="classInfo" value={tagState} onChange={onChange}>
            {classData.getClassOptions.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </td>
        <td>
          <select name="tagInfo" value={id} onChange={onChange}>
            {tagData.getTagOptions.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </td>
        <td>x</td>
      </tr>
    );
  }
};

export default SearchTagTable;
