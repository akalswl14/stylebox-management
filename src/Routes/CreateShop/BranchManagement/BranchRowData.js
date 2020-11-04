import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../../Components/Button";
import { DeleteIcon } from "../../../Components/Icons";
import { ShopInfoContext } from "../CreateShopContainer";

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
  text-align: left;
`;

const TitleSpan = styled.span`
  width: 90px;
  line-height: 35px;
  border: black solid 1px;
  height: 35px;
`;

const MapUrlWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MapUrlCellWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default ({ data }) => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "BranchNameInput") {
      const rtnData = ShopInfoState.BranchManagement.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            ...eachData,
            BranchName: value,
          };
        }
        return eachData;
      });
      ShopInfoDispatch({
        type: "UPDATE_BRANCH",
        data: { BranchManagement: rtnData },
      });
      return;
    }
    if (name === "BranchPhoneNumberInput") {
      const rtnData = ShopInfoState.BranchManagement.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            ...eachData,
            PhoneNumber: value,
          };
        }
        return eachData;
      });
      ShopInfoDispatch({
        type: "UPDATE_BRANCH",
        data: { BranchManagement: rtnData },
      });
      return;
    }
    if (name === "BranchAddressInput") {
      const rtnData = ShopInfoState.BranchManagement.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            ...eachData,
            Address: value,
          };
        }
        return eachData;
      });
      ShopInfoDispatch({
        type: "UPDATE_BRANCH",
        data: { BranchManagement: rtnData },
      });
      return;
    }
    if (name === "BranchMapUrl") {
      const rtnData = ShopInfoState.BranchManagement.map((eachData) => {
        if (eachData.id === Number(data.id)) {
          return {
            ...eachData,
            MapUrl: value,
          };
        }
        return eachData;
      });
      ShopInfoDispatch({
        type: "UPDATE_BRANCH",
        data: { BranchManagement: rtnData },
      });
      return;
    }
  };

  const deleteRow = (e, rowId) => {
    e.preventDefault();
    let PrevData = ShopInfoState.BranchManagement;
    const idx = PrevData.findIndex(function (item) {
      return item.id === Number(rowId);
    });
    if (idx > -1) PrevData.splice(idx, 1);
    ShopInfoDispatch({
      type: "UPDATE_BRANCH",
      data: { BranchManagement: PrevData },
    });
  };

  const CheckLink = (e) => {
    let InputLink = data.MapUrl;
    InputLink =
      InputLink.includes("http://") || InputLink.includes("https://")
        ? InputLink
        : "http://" + InputLink;
    try {
      window.open(InputLink, "_blank");
    } catch (e) {
      toast.error("You are checking invalid URL");
    }
    const rtnData = ShopInfoState.BranchManagement.map((eachData) => {
      if (eachData.id === Number(data.id)) {
        return {
          ...eachData,
          MapUrl: InputLink,
        };
      }
      return eachData;
    });
    ShopInfoDispatch({
      type: "UPDATE_BRANCH",
      data: { BranchManagement: rtnData },
    });
  };

  return (
    <tr id={data.id}>
      <td className="orderInputCell">{data.id}</td>
      <td>
        <Input
          InputWidth={200}
          type="text"
          name="BranchNameInput"
          value={data.BranchName}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td>
        <Input
          InputWidth={200}
          type="text"
          name="BranchPhoneNumberInput"
          value={data.PhoneNumber}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td className="AddressCell">
        <Input
          InputWidth={400}
          type="text"
          name="BranchAddressInput"
          value={data.Address}
          onChange={(e) => onChange(e)}
        />
      </td>
      <td className="MapUrlCell">
        <MapUrlCellWrapper>
          <MapUrlWrapper>
            <TitleSpan>Map URL</TitleSpan>
            <Input
              InputWidth={500}
              type="text"
              name="BranchMapUrl"
              value={data.MapUrl}
              onChange={(e) => onChange(e)}
            />
          </MapUrlWrapper>
          <Button
            text={"Check"}
            isButtonType={true}
            ClickEvent={CheckLink}
            name="BranchMapUrlCheckButton"
          />
        </MapUrlCellWrapper>
      </td>
      <td className="buttonCell">
        <RowButton onClick={(e) => deleteRow(e, data.id)}>
          <DeleteIcon size={19} />
        </RowButton>
      </td>
    </tr>
  );
};
