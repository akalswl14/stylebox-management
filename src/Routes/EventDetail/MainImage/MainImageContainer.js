import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { EventInfoContext } from "../EventDetailContainer";
import MainImageRowData from "./MainImageRowData";

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
  const { EventInfoState, EventInfoDispatch } = useContext(EventInfoContext);

  const addRow = (e) => {
    e.preventDefault();
    let PrevLinkData = EventInfoState.MainImages.value;
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
    EventInfoDispatch({
      type: "UPDATE_MAINIMAGE",
      data: {
        MainImages: { value: PrevLinkData, isChange: true },
      },
    });
  };

  return (
    <>
      <SectionTitle text="Event Main Images" />
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
        {EventInfoState.MainImages.value.map((eachRow) => (
          <MainImageRowData data={eachRow} />
        ))}
      </Table>
    </>
  );
};
