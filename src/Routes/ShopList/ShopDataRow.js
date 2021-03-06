import React, { useContext } from "react";
import styled from "styled-components";
import PageChangeButton from "../../Components/PageChangeButton";
import { ShopListContext } from "./ShopListContainer";

const WeightInputBox = styled.input`
  width: 60px;
  text-align: center;
`;

const TagSpan = styled.span`
  font-weight: 500;
  .commanSpan {
    font-weight: 100;
    color: red;
  }
`;

const ShopDataRow = ({ data }) => {
  const { ShopListState, ShopListDispatch } = useContext(ShopListContext);

  const ChangeCheckBox = (shopId) => {
    ShopListDispatch({
      type: "UPDATE_SELECTSHOP",
      data: {
        shopId,
      },
    });
  };

  const CheckInUpdate = (shopId) => {
    const ShopCheckList = ShopListState.WeightData.filter(
      (eachShop) => eachShop.id === shopId
    );
    if (ShopCheckList.length > 0) return true;
    return false;
  };

  const ReturnWeight = (shopId) => {
    const ShopCheckList = ShopListState.WeightData.filter(
      (eachShop) => eachShop.id === shopId
    );
    if (ShopCheckList.length > 0) return ShopCheckList[0].value;
    return data.weight;
  };

  const ChangeWeight = (shopId, e) => {
    ShopListDispatch({
      type: "UPDATE_WEIGHT",
      data: {
        shopId,
        value: e.target.value,
      },
    });
  };

  return (
    <tr id={data.shopId} key={data.shopId}>
      <td>
        <input
          type="checkbox"
          name="SelectInputBox"
          onChange={() => ChangeCheckBox(data.shopId)}
          checked={
            ShopListState.SelectedShopList.includes(data.shopId) ? true : false
          }
        />
      </td>
      <td>{data.shopId}</td>
      <td>{data.shopName}</td>
      <td>{data.phoneNumber}</td>
      <td>{data.address}</td>
      <td className="tagNameCell">
        {data.tagNames.map((eachTagName, index) => {
          if (index === data.tagNames.length - 1) {
            return <TagSpan key={index}>{eachTagName}</TagSpan>;
          } else {
            return (
              <TagSpan key={index}>
                {eachTagName}
                <TagSpan className="commanSpan">{" / "}</TagSpan>
              </TagSpan>
            );
          }
        })}
      </td>
      <td>{data.rankNum}</td>
      <td>
        <WeightInputBox
          type="text"
          name="WeightInputBox"
          onChange={(e) => ChangeWeight(data.shopId, e)}
          value={ReturnWeight(data.shopId)}
          className={
            CheckInUpdate(data.shopId) ? "InUpdateList" : "NotInUpdateList"
          }
        />
      </td>
      <td>{data.postNum}</td>
      <td>{data.productNum}</td>
      <td>{data.likeNum}</td>
      <td>{data.viewNum}</td>
      <td>
        <PageChangeButton
          text="edit"
          href={"/shopdetail/" + data.shopId}
          width={50}
        />
      </td>
    </tr>
  );
};

export default ShopDataRow;
