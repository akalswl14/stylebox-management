import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { GET_CLASS, GET_TAG } from "../CreateProductQueries";
import { DeleteIcon } from "../../../Components/Icons";
import { ProductInfoContext } from "../CreateProductContainer";

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

export default ({ data }) => {
  const { ProductInfoState, ProductInfoDispatch } = useContext(
    ProductInfoContext
  );

  const categories = ProductInfoState.CategoryData;

  const [categoryInputState, setCategoryInputState] = useState(data.category);
  const [classIdInputState, setClassIdInputState] = useState(
    Number(data.classId)
  );
  useEffect(() => {
    setCategoryInputState(data.category);
    setClassIdInputState(Number(data.classId));
  }, [data.category, Number(data.classId)]);
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
        const rtnData = ProductInfoState.TagInformation.value.map((tag) => {
          if (tag.id === Number(data.id)) {
            return {
              id: Number(data.id),
              order: Number(value),
              category: data.category,
              classId: Number(data.classId),
              className: data.className,
              tagId: Number(data.tagId),
              tagName: data.tagName,
            };
          }
          return tag;
        });
        ProductInfoDispatch({
          type: "UPDATE_TAGINFO",
          data: { TagInformation: { value: rtnData } },
        });
      }
    }
    if (name === "CategorySelectBox") {
      setCategoryInputState(value);
      const rtnData = ProductInfoState.TagInformation.value.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            id: Number(data.id),
            order: Number(data.order),
            category: value,
            classId: 0,
            className: "-- CHOOSE DATA --",
            tagId: 0,
            tagName: "-- CHOOSE DATA --",
          };
        }
        return eachData;
      });
      ProductInfoDispatch({
        type: "UPDATE_TAGINFO",
        data: { TagInformation: { value: rtnData } },
      });
    }
    if (name === "ClassSelectBox") {
      setClassIdInputState(Number(value));
      const rtnData = ProductInfoState.TagInformation.value.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            id: Number(data.id),
            order: Number(data.order),
            category: data.category,
            classId: Number(value),
            className: e.target[e.target.selectedIndex].text,
            tagId: 0,
            tagName: "-- CHOOSE DATA --",
          };
        }
        return eachData;
      });
      ProductInfoDispatch({
        type: "UPDATE_TAGINFO",
        data: { TagInformation: { value: rtnData } },
      });
    }
    if (name === "TagSelectBox") {
      const rtnData = ProductInfoState.TagInformation.value.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            id: Number(data.id),
            order: Number(data.order),
            category: data.category,
            classId: Number(data.classId),
            className: data.className,
            tagId: Number(value),
            tagName: e.target[e.target.selectedIndex].text,
          };
        }
        return eachData;
      });
      ProductInfoDispatch({
        type: "UPDATE_TAGINFO",
        data: { TagInformation: { value: rtnData } },
      });
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    let PrevData = ProductInfoState.TagInformation.value;
    PrevData = PrevData.filter((item) => item.id !== Number(rowId));
    ProductInfoDispatch({
      type: "UPDATE_TAGINFO",
      data: {
        TagInformation: { value: PrevData },
      },
    });
  };

  if (
    classLoading ||
    tagLoading ||
    (data.tagId > 0 && !classLoading && !classData.getClassOptions)
  ) {
    return (
      <tr>
        <td className="orderInputCell">
          <OrderInputBox name="order" value={data.order} onChange={() => 0} />
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
          <select name="tagInfo">
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
  }

  if (!classLoading && classData && tagData) {
    return (
      <tr id={data.id}>
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
              <option value={data.category}>{data.category}</option>
            ) : (
              <></>
            )}
            {categories.map((category, index) => (
              <option value={category} key={index}>
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
              <option value={data.className}>{data.className}</option>
            ) : (
              <></>
            )}
            {data.category !== "-- CHOOSE DATA --" ? (
              classData.getClassOptions.map((item, index) => (
                <option value={item.id} key={index}>
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
              <option value={data.tagId}>{data.tagName}</option>
            ) : (
              <></>
            )}
            {data.classId !== 0 ? (
              tagData.getTagOptions.map((item, index) => (
                <option value={item.id} key={index}>
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
