import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { ShopInfoContext } from "../ShopDetailContainer";
import ShopImageRowData from "./ShopImageRowData";

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
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
  .orderInputCell,
  .buttonCell {
    width: 6.8%;
  }
  .checkButtonCell {
    width: 13.6%;
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
    let PrevLinkData = ShopInfoState.ShopImagesManagement.value;
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
      isNewImage: true,
      s3Key: null,
    };
    PrevLinkData.push(newData);
    ShopInfoDispatch({
      type: "UPDATE_SHOPIMAGE",
      data: {
        ShopImagesManagement: { value: PrevLinkData, isChange: true },
      },
    });
  };

  return (
    <>
      <SectionTitle text="Shop Images Management" />
      <Table>
        <thead>
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
        </thead>
        <tbody>
          {ShopInfoState.ShopImagesManagement.value.map((eachRow, index) => (
            <ShopImageRowData data={eachRow} key={index} />
          ))}
        </tbody>
      </Table>
    </>
  );
};
