import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { PlusIcon } from "../../Components/Icons";
import { TagIconContext } from "./TagIconContainer";
import TagIconDataRow from "./TagIconDataRow";

const Table = styled.table`
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
  .orderInputCell,
  .buttonCell {
    width: 90px;
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
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

export const BestTagIcon = ({ categories }) => {
  const { TagIconDispatch, TagIconState } = useContext(TagIconContext);
  const addRow = (e) => {
    e.preventDefault();
    const PrevBestRowData = TagIconState.BestIconRowData;
    const newData = {
      id:
        PrevBestRowData.length > 0
          ? PrevBestRowData[PrevBestRowData.length - 1].id + 1
          : 1,
      order:
        PrevBestRowData.length > 0
          ? PrevBestRowData[PrevBestRowData.length - 1].id + 1
          : 1,
      category: "-- CHOOSE DATA --",
      classId: 0,
      className: "-- CHOOSE DATA --",
      tagId: 0,
      tagName: "-- CHOOSE DATA --",
    };
    TagIconDispatch({
      type: "CREATE_BESTTAG",
      data: newData,
    });
  };
  return (
    <>
      <SectionTitle text={"Category Tag Icon Management ( in Best Page )"} />
      <Table>
        <thead>
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
        </thead>
        <tbody>
          {TagIconState.BestIconRowData.map((eachRow, index) => (
            <TagIconDataRow
              data={eachRow}
              categories={categories}
              section={"BestTag"}
              key={index}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
