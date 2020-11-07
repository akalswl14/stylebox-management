import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { ShopInfoContext } from "../ShopDetailContainer";
import BranchRowData from "./BranchRowData";

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
    width: ${(props) => {
      if (props.CellWidth) {
        return props.CellWidth.toString() + "px";
      } else {
        return null;
      }
    }};
  }
  .orderInputCell,
  .buttonCell {
    width: 85px;
  }
  .AddressCell {
    width: 410px;
  }
  .MapUrlCell {
    width: 730px;
  }
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

export default () => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  const addRow = (e) => {
    e.preventDefault();
    let PrevData = ShopInfoState.BranchManagement.value;
    const newData = {
      id: PrevData.length > 0 ? PrevData[PrevData.length - 1].id + 1 : 1,
      BranchId: null,
      BranchName: "",
      PhoneNumber: "",
      Address: "",
      MapUrl: "",
    };
    PrevData.push(newData);
    ShopInfoDispatch({
      type: "UPDATE_BRANCH",
      data: {
        BranchManagement: { value: PrevData, isChange: true },
      },
    });
  };

  return (
    <>
      <SectionTitle text="Branch Management" />
      <Table>
        <tr>
          <th className="orderInputCell">No</th>
          <th>Branch Name</th>
          <th>Phone Number</th>
          <th className="AddressCell">Address</th>
          <th className="MapUrlCell">Map URL</th>
          <th className="buttonCell">
            <RowButton onClick={(e) => addRow(e)}>
              <PlusIcon size={19} />
            </RowButton>
          </th>
        </tr>
        {ShopInfoState.BranchManagement.value.map((eachRow) => (
          <BranchRowData data={eachRow} />
        ))}
      </Table>
    </>
  );
};
