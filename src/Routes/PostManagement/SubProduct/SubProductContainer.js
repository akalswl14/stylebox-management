import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { PostInfoContext } from "../PostInfoContainer";
import SubProductTable from "./SubProductTable";

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
    padding: 10px;
  }
  td:first-child {
    border: 1px solid #858585;
    padding: 10px;
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

export default () => {
  const { postState, postDispatch } = useContext(PostInfoContext);

  const addRow = (e) => {
    e.preventDefault();
    const PrevMainRowData = postState.subProductManagement;
    const newData = {
      id:
        PrevMainRowData.length > 0
          ? PrevMainRowData[PrevMainRowData.length - 1].id + 1
          : 1,
      order:
        PrevMainRowData.length > 0
          ? PrevMainRowData[PrevMainRowData.length - 1].id + 1
          : 1,
      productId: 0,
      productName: "",
      price: 0,
      link: "",
    };
    postDispatch({
      type: "CREATE_PRODUCT",
      data: newData,
    });
  };

  return (
    <>
      <TitleBox>
        <SectionTitle text={"Sub Product Management"} />
      </TitleBox>
      <Table>
        <th>Order</th>
        <th>Product ID</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Product Link</th>
        <th>Check</th>
        <th>
          <RowButton onClick={(e) => addRow(e)}>
            <PlusIcon size={19} />
          </RowButton>
        </th>
        {postState.subProductManagement.map((eachData) => (
          <SubProductTable key={eachData.id} data={eachData} />
        ))}
      </Table>
    </>
  );
};