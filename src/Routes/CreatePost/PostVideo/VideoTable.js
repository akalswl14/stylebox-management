import React, { useContext } from "react";
import { DeleteIcon } from "../../../Components/Icons";
import styled from "styled-components";
import { PostInfoContext } from "../PostInfoContainer";
import Button from "../../../Components/Button";
import YoutubeThumbnail from "../../../Components/YoutubeThumbnail";

const OrderInputBox = styled.input`
  width: 30px;
  text-align: center;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
`;

const ImageTable = ({ data }) => {
  const { postDispatch } = useContext(PostInfoContext);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "order") {
      if (Number(value) >= 0) {
        postDispatch({
          type: "UPDATE_VIDEO",
          data: {
            id: Number(data.id),
            order: Number(value),
            url: data.url,
          },
        });
      }
    }
    if (name === "url") {
      postDispatch({
        type: "UPDATE_VIDEO",
        data: {
          id: Number(data.id),
          order: Number(data.order),
          url: value,
        },
      });
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    postDispatch({
      type: "DELETE_VIDEO",
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

  let youtubeUrl = String(data.url).split("/");
  let youtubeSrc = "https://www.youtube.com/embed/" + youtubeUrl[3];

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
        <input name="url" type="text" value={data.url} onChange={onChange} />
      </td>
      <td>
        <YoutubeThumbnail url={data.url} />
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

export default ImageTable;
