import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { ShopInfoContext } from "../CreateShopContainer";
import TagDataRow from "./TagDataRow";

const Table = styled.table`
  font-size: 15px;
  tr {
    height: 40px;
  }
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    border-bottom: 0.5px solid black;
  }
  td:first-child,
  th:first-child {
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
  .smallerCell {
    width: 400px;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

export default ({ categories }) => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  const addRow = (e) => {
    e.preventDefault();
    let PrevTagData = ShopInfoState.TagInformation;
    const newData = {
      id:
        PrevTagData.length > 0 ? PrevTagData[PrevTagData.length - 1].id + 1 : 1,
      order:
        PrevTagData.length > 0 ? PrevTagData[PrevTagData.length - 1].id + 1 : 1,
      category: "-- CHOOSE DATA --",
      classId: 0,
      className: "-- CHOOSE DATA --",
      tagId: 0,
      tagName: "-- CHOOSE DATA --",
    };
    PrevTagData.push(newData);
    ShopInfoDispatch({
      type: "UPDATE_TAGINFO",
      data: {
        TagInformation: PrevTagData,
      },
    });
  };

  return (
    <>
      <SectionTitle text="Tag Information" />
      <Table>
        <thead>
          <tr>
            <th className="orderInputCell">Order</th>
            <th>Tag Type</th>
            <th>Class</th>
            <th>Tag</th>
            <th className="buttonCell">
              <RowButton onClick={(e) => addRow(e)}>
                <PlusIcon size={19} />
              </RowButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {ShopInfoState.TagInformation.map((eachRow, index) => (
            <TagDataRow data={eachRow} categories={categories} key={index} />
          ))}
        </tbody>
      </Table>
    </>
  );
};
