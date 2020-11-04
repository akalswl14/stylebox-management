import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { ShopInfoContext } from "../CreateShopContainer";
import LinkDataRow from "./LinkDataRow";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  font-size: 15px;
  tr {
    height: 40px;
  }
  tr,
  td,
  th {
    border: ${(props) => props.theme.tableBorder};
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
  }
  .orderInputCell,
  .buttonCell {
    width: 120px;
  }
  .checkButtonCell {
    width: 180px;
  }
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

export default ({ linkTypes }) => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  const addRow = (e) => {
    e.preventDefault();
    let PrevLinkData = ShopInfoState.ExternalLink;
    const newData = {
      id:
        PrevLinkData.length > 0
          ? PrevLinkData[PrevLinkData.length - 1].id + 1
          : 1,
      order:
        PrevLinkData.length > 0
          ? PrevLinkData[PrevLinkData.length - 1].id + 1
          : 1,
      linkType: "-- CHOOSE DATA --",
      url: "",
      isShown: true,
    };
    PrevLinkData.push(newData);
    ShopInfoDispatch({
      type: "UPDATE_EXTERNALLINK",
      data: {
        ExternalLink: PrevLinkData,
      },
    });
  };

  return (
    <>
      <SectionTitle text="External Link" />
      <Table>
        <tr>
          <th className="orderInputCell">Order</th>
          <th>Category</th>
          <th>Link URL</th>
          <th className="buttonCell">Show</th>
          <th className="checkButtonCell">Check</th>
          <th className="buttonCell">
            <RowButton onClick={(e) => addRow(e)}>
              <PlusIcon size={19} />
            </RowButton>
          </th>
        </tr>
        {ShopInfoState.ExternalLink.map((eachRow) => (
          <LinkDataRow data={eachRow} linkTypes={linkTypes} />
        ))}
      </Table>
    </>
  );
};
