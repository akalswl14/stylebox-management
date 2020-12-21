import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { EventInfoContext } from "../CreateEventContainer";
import DetailImageRowData from "./DetailImageRowData";

const Table = styled.table`
  font-size: 15px;
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  tr {
    height: 40px;
  }
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
  const { EventInfoState, EventInfoDispatch } = useContext(EventInfoContext);

  const addRow = (e) => {
    e.preventDefault();
    let PrevLinkData = EventInfoState.DetailImages.value;
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
    EventInfoDispatch({
      type: "UPDATE_DETAILIMAGE",
      data: {
        DetailImages: { value: PrevLinkData },
      },
    });
  };

  return (
    <>
      <SectionTitle text="Event Detail Images" />
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
          {EventInfoState.DetailImages.value.map((eachRow, index) => (
            <DetailImageRowData data={eachRow} key={index} />
          ))}
        </tbody>
      </Table>
    </>
  );
};
