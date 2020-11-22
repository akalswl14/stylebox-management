import React, { useState, useContext } from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_CLASS, GET_TAG } from "./SearchTagQueries";
import { DeleteIcon } from "../../Components/Icons";
import styled from "styled-components";
import { SearchTagIconContext } from "./SearchTagContainer";

const OrderInputBox = styled.input`
  width: 30px;
  text-align: center;
`;

const SelectBox = styled.select`
  width: 200px;
  text-align: center;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
`;

const SearchTagTable = ({ categories, data }) => {
  const { searchTagDispatch } = useContext(SearchTagIconContext);
  let categoryData;
  let classIdData;

  if (data.category === "-- CHOOSE DATA --") {
    categoryData = "Style";
    classIdData = 0;
  } else {
    categoryData = data.category;
    classIdData = Number(data.classId);
  }

  const [classState, setclassState] = useState(categoryData);
  const [tagState, setTagState] = useState(classIdData);

  const { loading: classLoading, data: classData } = useQuery(GET_CLASS, {
    variables: { category: classState },
  });
  const { loading: tagLoading, data: tagData } = useQuery(GET_TAG, {
    variables: { classId: tagState },
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "order") {
      if (Number(value) >= 0) {
        searchTagDispatch({
          type: "UPDATE_TAG",
          data: {
            id: Number(data.id),
            order: Number(value),
            category: data.category,
            classId: Number(data.classId),
            className: data.className,
            tagId: Number(data.tagId),
            tagName: data.tagName,
          },
        });
      }
    }
    if (name === "category") {
      setclassState(value);
      searchTagDispatch({
        type: "UPDATE_TAG",
        data: {
          id: Number(data.id),
          order: Number(data.order),
          category: value,
          classId: 0,
          className: "-- CHOOSE DATA --",
          tagId: 0,
          tagName: "-- CHOOSE DATA --",
        },
      });
    }
    if (name === "classInfo") {
      setTagState(Number(value));
      searchTagDispatch({
        type: "UPDATE_TAG",
        data: {
          id: Number(data.id),
          order: Number(data.order),
          category: data.category,
          classId: Number(value),
          className: e.target[e.target.selectedIndex].text,
          tagId: 0,
          tagName: "-- CHOOSE DATA --",
        },
      });
    }
    if (name === "tagInfo") {
      searchTagDispatch({
        type: "UPDATE_TAG",
        data: {
          id: Number(data.id),
          order: Number(data.order),
          category: data.category,
          classId: Number(data.classId),
          className: data.className,
          tagId: Number(value),
          tagName: e.target[e.target.selectedIndex].text,
        },
      });
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    searchTagDispatch({
      type: "DELETE_TAG",
      data: {
        id: Number(rowId),
      },
    });
  };

  if (classLoading || tagLoading)
    return (
      <tr key={data.id}>
        <td className="orderInputCell">
          <OrderInputBox
            type="text"
            name="order"
            value={data.order}
            required
            readOnly={true}
          />
        </td>
        <td>
          <select name="category" readOnly={true}>
            <option value={"-- LOADING --"}>{"-- LOADING --"}</option>
          </select>
        </td>
        <td>
          <select name="classInfo" readOnly={true}>
            <option value={0}>{"-- LOADING --"}</option>
          </select>
        </td>
        <td>
          <select name="tagInfo" readOnly={true}>
            <option value={0}>{"-- LOADING --"}</option>
          </select>
        </td>
        <td className="buttonCell">
          <RowButton>
            <DeleteIcon size={19} />
          </RowButton>
        </td>
      </tr>
    );

  if (!classLoading && classData && tagData) {
    return (
      <tr id={data.id}>
        <td>
          <OrderInputBox
            name="order"
            type="text"
            defaultValue={data.order}
            onChange={onChange}
            required
          />
        </td>
        <td>
          <SelectBox name="category" value={data.category} onChange={onChange}>
            {data.category === "-- CHOOSE DATA --" ? (
              <option value={data.category}>{data.category}</option>
            ) : (
              <></>
            )}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </SelectBox>
        </td>
        <td>
          <SelectBox name="classInfo" value={data.classId} onChange={onChange}>
            {data.classId === 0 ? (
              <option value={data.className}>{data.className}</option>
            ) : (
              <></>
            )}
            {data.category !== "-- CHOOSE DATA --" ? (
              classData.getClassOptions &&
              classData.getClassOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))
            ) : (
              <></>
            )}
          </SelectBox>
        </td>
        <td>
          <SelectBox name="tagInfo" value={data.tagId} onChange={onChange}>
            {data.tagId === 0 ? (
              <option value={data.tagId}>{data.tagName}</option>
            ) : (
              <></>
            )}
            {data.classId !== 0 ? (
              tagData.getTagOptions &&
              tagData.getTagOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))
            ) : (
              <></>
            )}
          </SelectBox>
        </td>
        <td>
          <RowButton onClick={(e) => deleteRow(e, data.id)}>
            <DeleteIcon size={19} />
          </RowButton>
        </td>
      </tr>
    );
  }
};

export default SearchTagTable;
