import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { PostInfoContext } from "../PostInfoContainer";
import SubProductTable from "./SubProductTable";
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
  th:nth-child(2n-1) {
    width: 25%;
  }
  td:first-child,
  th:first-child {
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
    width: 10%;
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

export default () => {
  const { postState, postDispatch } = useContext(PostInfoContext);

  const addRow = (e) => {
    e.preventDefault();
    const PrevMainRowData = postState.subProductManagement;
    if (PrevMainRowData.length >= 5) {
      toast.error("Up to 5 is possible.");
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
        <thead>
          <tr>
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
          </tr>
        </thead>
        <tbody>
          {postState.subProductManagement.map((eachData) => (
            <SubProductTable key={eachData.id} data={eachData} />
          ))}
        </tbody>
      </Table>
    </>
  );
};
