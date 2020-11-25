import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { PostInfoContext } from "../PostInfoContainer";
import TagInfoTable from "./TagInfoTable";
import { toast } from "react-toastify";

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
  td {
    vertical-align: middle;
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

export default ({ categories }) => {
  const { postState, postDispatch } = useContext(PostInfoContext);

  const addRow = (e) => {
    e.preventDefault();
    const PrevMainRowData = postState.tagInfoData;
    if (PrevMainRowData.length >= 20) {
      toast.error("Up to 20 is possible.");
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
      category: "-- CHOOSE DATA --",
      classId: 0,
      className: "-- CHOOSE DATA --",
      tagId: 0,
      tagName: "-- CHOOSE DATA --",
    };
    postDispatch({
      type: "CREATE_TAG",
      data: newData,
    });
  };
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Tag Information"} />
      </TitleBox>
      <Table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Tag Type</th>
            <th>Class</th>
            <th>Tag</th>
            <th>
              <RowButton onClick={(e) => addRow(e)}>
                <PlusIcon size={19} />
              </RowButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {postState.tagInfoData.map((postTag) => (
            <TagInfoTable
              key={postTag.id}
              categories={categories}
              data={postTag}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
