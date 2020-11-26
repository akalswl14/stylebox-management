import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { PostInfoContext } from "../PostInfoContainer";
import LinkTable from "./LinkTable";
import { toast } from "react-toastify";

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
    width: 10%;
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
  }
  th:last-child {
    width: 10%;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
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
    if (PrevMainRowData.length >= 10) {
      toast.error("Up to 10 is possible.");
      return;
    }
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
        <thead>
          <tr>
            <th>Order</th>
            <th>Link Type</th>
            <th>Link URL</th>
            <th>Show</th>
            <th>Check</th>
            <th>
              <RowButton onClick={(e) => addRow(e)}>
                <PlusIcon size={19} />
              </RowButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {postState.externalLink.map((postLink) => (
            <LinkTable
              key={postLink.id}
              linkTypes={linkTypes}
              data={postLink}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
