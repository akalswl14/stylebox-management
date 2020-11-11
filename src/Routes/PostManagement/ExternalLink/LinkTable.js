import React, { useContext } from "react";
import { DeleteIcon } from "../../../Components/Icons";
import styled from "styled-components";
import { PostInfoContext } from "../PostInfoContainer";
import Button from "../../../Components/Button";

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

const LinkTable = ({ linkTypes, data }) => {
  const { postDispatch } = useContext(PostInfoContext);

  const onChange = (e) => {
    const { value, name } = e.target;

    if (name === "order") {
      if (Number(value) >= 0) {
        postDispatch({
          type: "UPDATE_LINK",
          data: {
            id: Number(data.id),
            order: Number(value),
            linkType: data.linkType,
            url: data.url,
            isShown: data.isShown,
          },
        });
      }
    }
    if (name === "linkType") {
      postDispatch({
        type: "UPDATE_LINK",
        data: {
          id: Number(data.id),
          order: data.order,
          linkType: value,
          url: data.url,
          isShown: data.isShown,
        },
      });
    }
    if (name === "url") {
      postDispatch({
        type: "UPDATE_LINK",
        data: {
          id: Number(data.id),
          order: data.order,
          linkType: data.linkType,
          url: value,
          isShown: data.isShown,
        },
      });
    }
    if (name === "isShown") {
      postDispatch({
        type: "UPDATE_LINK",
        data: {
          id: Number(data.id),
          order: data.order,
          linkType: data.linkType,
          url: data.url,
          isShown: e.target.checked,
        },
      });
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    postDispatch({
      type: "DELETE_LINK",
      data: {
        id: Number(rowId),
      },
    });
  };

  const ClickEvent = (e) => {
    e.preventDefault();
    let url = data.url;
    if (url.includes("https://") || url.includes("http://")) {
      window.open(`${data.url}`, "_blank");
    } else {
      alert("유효한 주소가 아닙니다.");
    }
  };

  return (
    <tr id={data.id}>
      <td>
        <OrderInputBox
          name="order"
          type="text"
          value={data.order}
          onChange={onChange}
          required
        />
      </td>
      <td>
        <SelectBox name="linkType" value={data.linkType} onChange={onChange}>
          {data.linkType === "-- CHOOSE DATA --" ? (
            <option value={data.linkType}>{data.linkType}</option>
          ) : (
            <></>
          )}
          {linkTypes.map((linkType) => (
            <option value={linkType}>{linkType}</option>
          ))}
        </SelectBox>
      </td>
      <td>
        <input type="text" name="url" value={data.url} onChange={onChange} />
      </td>
      <td>
        <input
          type="checkbox"
          name="isShown"
          checked={data.isShown}
          onChange={onChange}
        />
      </td>
      <td>
        <Button text={"Check"} ClickEvent={ClickEvent} />
      </td>
      <td>
        <RowButton onClick={(e) => deleteRow(e, data.id)}>
          <DeleteIcon size={19} />
        </RowButton>
      </td>
    </tr>
  );
};

export default LinkTable;
