import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { GET_CLASS, GET_TAG } from "./TagIconQueries";
import { DeleteIcon } from "../../Components/Icons";
import { TagIconContext } from "./TagIconContainer";

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
  margin: 0;
`;

const TagIconDataRow = ({ data, categories, section }) => {
  const { TagIconDispatch } = useContext(TagIconContext);
  const [categoryInputState, setCategoryInputState] = useState(data.category);
  const [classIdInputState, setClassIdInputState] = useState(
    Number(data.classId)
  );
  const { loading: classLoading, data: classData } = useQuery(GET_CLASS, {
    variables: { category: categoryInputState },
  });
  const { loading: tagLoading, data: tagData } = useQuery(GET_TAG, {
    variables: { classId: classIdInputState },
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "order") {
      if (Number(value) > 0) {
        TagIconDispatch({
          type:
            section === "MainTag"
              ? "UPDATE_MAINTAG"
              : section === "BestTag"
              ? "UPDATE_BESTTAG"
              : "UPDATE_SHOPTAG",
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
    if (name === "CategorySelectBox") {
      setCategoryInputState(value);
      TagIconDispatch({
        type:
          section === "MainTag"
            ? "UPDATE_MAINTAG"
            : section === "BestTag"
            ? "UPDATE_BESTTAG"
            : "UPDATE_SHOPTAG",
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
    if (name === "ClassSelectBox") {
      setClassIdInputState(Number(value));
      TagIconDispatch({
        type:
          section === "MainTag"
            ? "UPDATE_MAINTAG"
            : section === "BestTag"
            ? "UPDATE_BESTTAG"
            : "UPDATE_SHOPTAG",
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
    if (name === "TagSelectBox") {
      TagIconDispatch({
        type:
          section === "MainTag"
            ? "UPDATE_MAINTAG"
            : section === "BestTag"
            ? "UPDATE_BESTTAG"
            : "UPDATE_SHOPTAG",
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
    TagIconDispatch({
      type:
        section === "MainTag"
          ? "DELETE_MAINTAG"
          : section === "BestTag"
          ? "DELETE_BESTTAG"
          : "DELETE_SHOPTAG",
      data: {
        id: Number(rowId),
      },
    });
  };

  if (classLoading || tagLoading)
    return (
      <tr>
        <td className="orderInputCell">
          <OrderInputBox name="order" defaultValue={1} />
        </td>
        <td>
          <select name="category">
            <option value={"-- LOADING --"}>{"-- LOADING --"}</option>
          </select>
        </td>
        <td>
          <select name="classInfo">
            <option value={0}>{"-- LOADING --"}</option>
          </select>
        </td>
        <td>
          <select name="tagInfo" defaultValue={1}>
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
      <tr id={data.id} key={data.id}>
        <td>
          <OrderInputBox name="order" value={data.order} onChange={onChange} />
        </td>
        <td>
          <SelectBox
            name="CategorySelectBox"
            value={data.category}
            onChange={onChange}
          >
            {data.category === "-- CHOOSE DATA --" ? (
              <option value={data.category} key={0}>
                {data.category}
              </option>
            ) : (
              <></>
            )}
            {categories.map((category, index) => (
              <option value={category} key={index + 1}>
                {category}
              </option>
            ))}
          </SelectBox>
        </td>
        <td>
          <SelectBox
            name="ClassSelectBox"
            value={data.classId}
            onChange={onChange}
          >
            {data.classId === 0 ? (
              <option value={data.className} key={0}>
                {data.className}
              </option>
            ) : (
              <></>
            )}
            {data.category !== "-- CHOOSE DATA --" ? (
              classData.getClassOptions.map((item, index) => (
                <option value={item.id} key={index + 1}>
                  {item.name}
                </option>
              ))
            ) : (
              <></>
            )}
          </SelectBox>
        </td>
        <td>
          <SelectBox name="TagSelectBox" value={data.tagId} onChange={onChange}>
            {data.tagId === 0 ? (
              <option value={data.tagId} key={0}>
                {data.tagName}
              </option>
            ) : (
              <></>
            )}
            {data.classId !== 0 ? (
              tagData.getTagOptions.map((item, index) => (
                <option value={item.id} key={index + 1}>
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

export default TagIconDataRow;
