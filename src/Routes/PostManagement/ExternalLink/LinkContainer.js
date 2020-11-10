import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { PostInfoContext } from "../PostInfoContainer";
import LinkTable from "./LinkTable";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  input {
    text-align: center;
  }
  th:first-child {
    width: 13%;
    padding: 12px;
    border-right: 1px solid #858585;
    background-color: #f2f2f2;
  }
  th {
    padding: 12px;
    border: 1px solid #858585;
  }
  tr {
    border: 1px solid #858585;
  }
  td:first-child {
    border: 1px solid #858585;
    padding: 8px;
    background-color: #f2f2f2;
  }
  .tableTitle {
    background-color: #f2f2f2;
  }
  .linkCell {
    display: flex;
    justify-content: space-around;
  }
  .NumCell {
    padding: 7px 0px;
  }
`;

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
`;

export default ({ linkTypes }) => {
  const { postState, postDispatch } = useContext(PostInfoContext);

  const addRow = (e) => {
    e.preventDefault();
    const PrevMainRowData = postState.externalLink;
    const newData = {
      id:
        PrevMainRowData.length > 0
          ? PrevMainRowData[PrevMainRowData.length - 1].id + 1
          : 1,
      order:
        PrevMainRowData.length > 0
          ? PrevMainRowData[PrevMainRowData.length - 1].id + 1
          : 1,
      linkType: "-- CHOOSE DATA --",
      url: "",
      isShown: false,
    };
    postDispatch({
      type: "CREATE_LINK",
      data: newData,
    });
  };
  return (
    <>
      <TitleBox>
        <SectionTitle text={"External Link"} />
      </TitleBox>
      <Table>
        <th>Order</th>
        <th>Category</th>
        <th>Link URL</th>
        <th>Show</th>
        <th>Check</th>
        <th>
          <RowButton onClick={(e) => addRow(e)}>
            <PlusIcon size={19} />
          </RowButton>
        </th>
        {postState.externalLink.map((postLink) => (
          <LinkTable key={postLink.id} linkTypes={linkTypes} data={postLink} />
        ))}
      </Table>
    </>
  );
};
