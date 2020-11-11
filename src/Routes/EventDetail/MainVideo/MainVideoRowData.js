import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../../Components/Button";
import { DeleteIcon } from "../../../Components/Icons";
import YoutubeThumbnail from "../../../Components/YoutubeThumbnail";
import { EventInfoContext } from "../EventDetailContainer";

const OrderInputBox = styled.input`
  width: 30px;
  text-align: center;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

const Input = styled.input`
  width: ${(props) => {
    if (props.InputWidth) {
      return props.InputWidth.toString() + "px";
    } else if (props.InputWidthPercent) {
      return props.InputWidthPercent.toString() + "%";
    } else {
      return null;
    }
  }};
  height: 35px;
  font-size: 15px;
  text-align: left;
`;

export default ({ data }) => {
  const { EventInfoState, EventInfoDispatch } = useContext(EventInfoContext);

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "order") {
      if (Number(value) > 0) {
        const rtnData = EventInfoState.MainVideos.value.map((eachData) => {
          if (eachData.id === Number(data.id)) {
            return {
              ...eachData,
              order: value,
            };
          }
          return eachData;
        });
        EventInfoDispatch({
          type: "UPDATE_MAINVIDEO",
          data: { MainVideos: { value: rtnData, isChange: true } },
        });
        return;
      }
    }
    if (name === "VideoLinkInput") {
      const rtnData = EventInfoState.MainVideos.value.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            ...eachData,
            url: value,
          };
        }
        return eachData;
      });
      EventInfoDispatch({
        type: "UPDATE_MAINVIDEO",
        data: { MainVideos: { value: rtnData, isChange: true } },
      });
      return;
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    let PrevData = EventInfoState.MainVideos.value;
    const idx = PrevData.findIndex(function (item) {
      return item.id === Number(rowId);
    });
    if (idx > -1) PrevData.splice(idx, 1);
    EventInfoDispatch({
      type: "UPDATE_MAINVIDEO",
      data: { MainVideos: { value: PrevData, isChange: true } },
    });
  };

  const CheckLink = (e) => {
    let InputLink = data.url;
    InputLink =
      InputLink.includes("http://") || InputLink.includes("https://")
        ? InputLink
        : "http://" + InputLink;
    try {
      window.open(InputLink, "_blank");
    } catch (e) {
      toast.error("You are checking invalid URL");
    }
    const rtnData = EventInfoState.MainVideos.value.map((eachData) => {
      if (eachData.id === Number(data.id)) {
        return {
          ...eachData,
          url: InputLink,
        };
      }
      return eachData;
    });
    EventInfoDispatch({
      type: "UPDATE_MAINVIDEO",
      data: { MainVideos: { value: rtnData, isChange: true } },
    });
  };

  return (
    <tr id={data.id}>
      <td className="orderInputCell">
        <OrderInputBox name="order" value={data.order} onChange={onChange} />
      </td>
      <td>
        <Input
          InputWidthPercent={100}
          type="text"
          name="VideoLinkInput"
          value={data.url}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>
        <YoutubeThumbnail url={data.url} />
      </td>
      <td className="checkButtonCell">
        <Button
          text={"Check"}
          isButtonType={true}
          ClickEvent={CheckLink}
          name="VideoLinkCheckButton"
        />
      </td>
      <td className="buttonCell">
        <RowButton onClick={(e) => deleteRow(e, data.id)}>
          <DeleteIcon size={19} />
        </RowButton>
      </td>
    </tr>
  );
};
