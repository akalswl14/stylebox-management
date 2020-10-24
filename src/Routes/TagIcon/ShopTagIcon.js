import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { PlusIcon } from "../../Components/Icons";
import { TagIconContext } from "./TagIconContainer";
import TagIconDataRow from "./TagIconDataRow";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
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
    width: 90px;
  }
  .tagNameCell {
    display: flex;
    justify-content: space-around;
    border: 0;
  }
  .NumCell {
    padding: 7px 0px;
  }
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

export const ShopTagIcon = ({ categories }) => {
  const { TagIconDispatch, TagIconState } = useContext(TagIconContext);
  const addRow = (e) => {
    e.preventDefault();
    const PrevShopRowData = TagIconState.ShopIconRowData;
    const newData = {
      id:
        PrevShopRowData.length > 0
          ? PrevShopRowData[PrevShopRowData.length - 1].id + 1
          : 1,
      order:
        PrevShopRowData.length > 0
          ? PrevShopRowData[PrevShopRowData.length - 1].id + 1
          : 1,
      category: "-- CHOOSE DATA --",
      classId: 0,
      className: "-- CHOOSE DATA --",
      tagId: 0,
      tagName: "-- CHOOSE DATA --",
    };
    TagIconDispatch({
      type: "CREATE_SHOPTAG",
      data: newData,
    });
  };
  return (
    <>
      <SectionTitle text={"Tag Icon Management ( in Shop Page )"} />
      <Table>
        <tr>
          <th className="orderInputCell">Order</th>
          <th>Category</th>
          <th>Class</th>
          <th>Tag</th>
          <th className="buttonCell">
            <RowButton onClick={(e) => addRow(e)}>
              <PlusIcon size={19} />
            </RowButton>
          </th>
        </tr>
        {TagIconState.ShopIconRowData.map((eachRow) => (
          <TagIconDataRow
            data={eachRow}
            categories={categories}
            section={"ShopTag"}
          />
        ))}
      </Table>
    </>
  );
};
