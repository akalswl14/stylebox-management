import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../../Components/Button";
import { DeleteIcon } from "../../../Components/Icons";
import { ShopInfoContext } from "../ShopDetailContainer";

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

const Input = styled.input`
  width: ${(props) => {
    if (props.InputWidth) {
      return props.InputWidth.toString() + "px";
    } else {
      return null;
    }
  }};
  height: 35px;
  font-size: 15px;
  text-align: center;
  text-align: left;
`;

export default ({ data }) => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  const linkTypes = ShopInfoState.LinkTypeData;

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "order") {
      if (Number(value) > 0) {
        const rtnData = ShopInfoState.ExternalLink.value.map((eachData) => {
          if (eachData.id === Number(data.id)) {
            return {
              ...eachData,
              order: value,
            };
          }
          return eachData;
        });
        ShopInfoDispatch({
          type: "UPDATE_EXTERNALLINK",
          data: { ExternalLink: { value: rtnData, isChange: true } },
        });
      }
    }
    if (name === "LinkTypeSelectBox") {
      const rtnData = ShopInfoState.ExternalLink.value.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            ...eachData,
            linkType: value,
          };
        }
        return eachData;
      });
      ShopInfoDispatch({
        type: "UPDATE_EXTERNALLINK",
        data: { ExternalLink: { value: rtnData, isChange: true } },
      });
    }
    if (name === "LinkUrlInput") {
      const rtnData = ShopInfoState.ExternalLink.value.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            ...eachData,
            url: value,
          };
        }
        return eachData;
      });
      ShopInfoDispatch({
        type: "UPDATE_EXTERNALLINK",
        data: { ExternalLink: { value: rtnData, isChange: true } },
      });
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    let PrevData = ShopInfoState.ExternalLink.value;
    const idx = PrevData.findIndex(function (item) {
      return item.id === Number(rowId);
    });
    if (idx > -1) PrevData.splice(idx, 1);
    ShopInfoDispatch({
      type: "UPDATE_EXTERNALLINK",
      data: { ExternalLink: { value: PrevData, isChange: true } },
    });
  };

  const ChangeCheckBox = () => {
    const rtnData = ShopInfoState.ExternalLink.value.map((eachData) => {
      if (eachData.id === Number(data.id)) {
        return {
          ...eachData,
          isShown: !eachData.isShown,
        };
      }
      return eachData;
    });
    ShopInfoDispatch({
      type: "UPDATE_EXTERNALLINK",
      data: { ExternalLink: { value: rtnData, isChange: true } },
    });
  };

  const CheckLink = () => {
    let InputLink;
    const rtnData = ShopInfoState.ExternalLink.value.map((eachData) => {
      if (eachData.id === data.id) {
        InputLink = eachData.url;
        InputLink =
          InputLink.includes("http://") || InputLink.includes("https://")
            ? InputLink
            : "http://" + InputLink;
        try {
          window.open(InputLink, "_blank");
        } catch (e) {
          toast.error("You are checking invalid URL");
        }
        return { ...eachData, url: InputLink };
      }
      return eachData;
    });
    ShopInfoDispatch({
      type: "UPDATE_EXTERNALLINK",
      data: { ExternalLink: { value: rtnData, isChange: true } },
    });
  };

  return (
    <tr id={data.id}>
      <td className="orderInputCell">
        <OrderInputBox name="order" value={data.order} onChange={onChange} />
      </td>
      <td>
        <SelectBox
          name="LinkTypeSelectBox"
          value={data.linkType}
          onChange={onChange}
        >
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
        <Input
          InputWidth={500}
          type="text"
          name="LinkUrlInput"
          value={data.url}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td className="buttonCell">
        <Input
          type="checkbox"
          name="LinkShowInput"
          onChange={() => ChangeCheckBox()}
          checked={data.isShown}
        />
      </td>
      <td className="checkButtonCell">
        <Button text={"Check"} isButtonType={true} ClickEvent={CheckLink} />
      </td>
      <td className="buttonCell">
        <RowButton onClick={(e) => deleteRow(e, data.id)}>
          <DeleteIcon size={19} />
        </RowButton>
      </td>
    </tr>
  );
};
