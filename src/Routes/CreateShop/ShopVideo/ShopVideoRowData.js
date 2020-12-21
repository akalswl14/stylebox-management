import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../../Components/Button";
import { DeleteIcon } from "../../../Components/Icons";
import YoutubeThumbnail from "../../../Components/YoutubeThumbnail";
import { ShopInfoContext } from "../CreateShopContainer";

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
    } else if (props.InputPercentWidth) {
      return props.InputPercentWidth.toString() + "%";
    } else {
      return null;
    }
  }};
  height: 35px;
  font-size: 15px;
  text-align: left;
`;

export default ({ data }) => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "order") {
      if (Number(value) > 0) {
        const rtnData = ShopInfoState.ShopVideoManagement.map((eachData) => {
          if (eachData.id === Number(data.id)) {
            return {
              ...eachData,
              order: value,
            };
          }
          return eachData;
        });
        ShopInfoDispatch({
          type: "UPDATE_SHOPVIDEO",
          data: { ShopVideoManagement: rtnData },
        });
        return;
      }
    }
    if (name === "VideoLinkInput") {
      const rtnData = ShopInfoState.ShopVideoManagement.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            ...eachData,
            url: value,
          };
        }
        return eachData;
      });
      ShopInfoDispatch({
        type: "UPDATE_SHOPVIDEO",
        data: { ShopVideoManagement: rtnData },
      });
      return;
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    let PrevData = ShopInfoState.ShopVideoManagement;
    const idx = PrevData.findIndex(function (item) {
      return item.id === Number(rowId);
    });
    if (idx > -1) PrevData.splice(idx, 1);
    ShopInfoDispatch({
      type: "UPDATE_SHOPVIDEO",
      data: { ShopVideoManagement: PrevData },
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
    const rtnData = ShopInfoState.ShopVideoManagement.map((eachData) => {
      if (eachData.id === Number(data.id)) {
        return {
          ...eachData,
          url: InputLink,
        };
      }
      return eachData;
    });
    ShopInfoDispatch({
      type: "UPDATE_SHOPVIDEO",
      data: { ShopVideoManagement: rtnData },
    });
  };

  return (
    <tr id={data.id} key={data.id}>
      <td className="orderInputCell">
        <OrderInputBox name="order" value={data.order} onChange={onChange} />
      </td>
      <td>
        <Input
          InputPercentWidth={100}
          type="text"
          name="VideoLinkInput"
          value={data.url}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td className="ThumbnailCell">
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
