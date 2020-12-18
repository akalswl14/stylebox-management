import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { EventInfoContext } from "../EventDetailContainer";
import MainVideoRowData from "./MainVideoRowData";

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
    let PrevLinkData = EventInfoState.MainVideos.value;
    const newData = {
      id:
        PrevLinkData.length > 0
          ? PrevLinkData[PrevLinkData.length - 1].id + 1
          : 1,
      order:
        PrevLinkData.length > 0
          ? PrevLinkData[PrevLinkData.length - 1].id + 1
          : 1,
      url: "",
    };
    PrevLinkData.push(newData);
    EventInfoDispatch({
      type: "UPDATE_MAINVIDEO",
      data: {
        MainVideos: { value: PrevLinkData, isChange: true },
      },
    });
  };

  return (
    <>
      <SectionTitle text="Event Video Management" />
      <Table>
        <thead>
          <tr>
            <th className="orderInputCell">Order</th>
            <th>Youtube URL</th>
            <th>Youtube Thumbnail</th>
            <th className="checkButtonCell">Check</th>
            <th className="buttonCell">
              <RowButton onClick={(e) => addRow(e)}>
                <PlusIcon size={19} />
              </RowButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {EventInfoState.MainVideos.value.map((eachRow) => (
            <MainVideoRowData data={eachRow} />
          ))}
        </tbody>
      </Table>
    </>
  );
};
