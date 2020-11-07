import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { ShopInfoContext } from "../CreateShopContainer";
import ShopImageRowData from "./ShopImageRowData";

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
  }
  .orderInputCell,
  .buttonCell {
    width: 120px;
  }
  .checkButtonCell {
    width: 180px;
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
    let PrevLinkData = ShopInfoState.ShopImagesManagement;
    const newData = {
      id:
        PrevLinkData.length > 0
          ? PrevLinkData[PrevLinkData.length - 1].id + 1
          : 1,
      order:
        PrevLinkData.length > 0
          ? PrevLinkData[PrevLinkData.length - 1].id + 1
          : 1,
      ImageFile: "",
      ImagePreviewUrl: "",
    };
    PrevLinkData.push(newData);
    ShopInfoDispatch({
      type: "UPDATE_SHOPIMAGE",
      data: {
        ShopImagesManagement: PrevLinkData,
      },
    });
  };

  return (
    <>
      <SectionTitle text="Shop Images Management" />
      <Table>
        <tr>
          <th className="orderInputCell">Order</th>
          <th>Upload a File</th>
          <th>Image</th>
          <th className="checkButtonCell">Enlarge Image</th>
          <th className="buttonCell">
            <RowButton onClick={(e) => addRow(e)}>
              <PlusIcon size={19} />
            </RowButton>
          </th>
        </tr>
        {ShopInfoState.ShopImagesManagement.map((eachRow) => (
          <ShopImageRowData data={eachRow} />
        ))}
      </Table>
    </>
  );
};