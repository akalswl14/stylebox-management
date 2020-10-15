import React, { useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import { PlusIcon, DeleteIcon } from "../../Components/Icons";
import { VariablesAreInputTypesRule } from "graphql";

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
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
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

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ButtonBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
`;

const OrderInputBox = styled.input`
  width: 30px;
  text-align: center;
`;

const SelectBox = styled.select`
  width: 100px;
  text-align: center;
`;

export const MainTagIcon = ({ setAction }) => {
  const [RowDatas, setRowDatas] = useState([
    {
      id: 1,
      order: 1,
      Category: "exampleCategory",
      Class: "exampleCategory",
      Tag: "exampleTag",
    },
  ]);
  const addRow = () => {
    const newData = {
      id: RowDatas[RowDatas.length - 1].id + 1,
      order: RowDatas[RowDatas.length - 1].order + 1,
      Category: "exampleCategory",
      Class: "exampleCategory",
      Tag: "exampleTag",
    };
    setRowDatas((prevData) => [...prevData, newData]);
  };
  const deleteRow = (rowId) => {
    setRowDatas(RowDatas.filter((eachRow) => eachRow.id !== rowId));
  };
  console.log("Here");
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Style Tag Icon Management ( in Main Page )"} />
        <ButtonBox>
          <Button
            text="Confirm"
            ClickEvent={() => {
              setAction("Confirm");
            }}
          ></Button>
        </ButtonBox>
      </TitleBox>
      <Table>
        <tr>
          <th>Order</th>
          <th>Category</th>
          <th>Class</th>
          <th>Tag</th>
          <th>
            <RowButton onClick={() => addRow()}>
              <PlusIcon size={19} />
            </RowButton>
          </th>
        </tr>
        {RowDatas.map((eachRow) => (
          <tr id={eachRow.id}>
            <td>
              <OrderInputBox placeholder={eachRow.order}></OrderInputBox>
            </td>
            <td>
              <SelectBox id="CategorySelectBox">
                <option value={eachRow.Category}>{eachRow.Category}</option>
                <option value="exCategory2">exCategory2</option>
                <option value="exCategory3">exCategory3</option>
                <option value="exCategory4">exCategory4</option>
              </SelectBox>
            </td>
            <td>
              <SelectBox id="CategorySelectBox">
                <option value={eachRow.Class}>{eachRow.Class}</option>
                <option value="exClass2">exClass2</option>
                <option value="exClass3">exClass3</option>
                <option value="exClass4">exClass4</option>
              </SelectBox>
            </td>
            <td>
              <SelectBox id="CategorySelectBox">
                <option value={eachRow.Tag}>{eachRow.Tag}</option>
                <option value="exTag2">exTag2</option>
                <option value="exTag3">exTag3</option>
                <option value="exTag4">exTag4</option>
              </SelectBox>
            </td>
            <td>
              <RowButton onClick={() => deleteRow(eachRow.id)}>
                <DeleteIcon size={19} />
              </RowButton>
            </td>
          </tr>
        ))}
      </Table>
    </>
  );
};
