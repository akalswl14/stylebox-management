import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { EventInfoContext } from "../EventDetailContainer";
import TagDataRow from "./TagDataRow";

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
  .smallerCell {
    width: 400px;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
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
    let PrevTagData = EventInfoState.TagInformation.value;
    const newData = {
      id:
        PrevTagData.length > 0 ? PrevTagData[PrevTagData.length - 1].id + 1 : 1,
      order:
        PrevTagData.length > 0 ? PrevTagData[PrevTagData.length - 1].id + 1 : 1,
      category: "-- CHOOSE DATA --",
      classId: 0,
      className: "-- CHOOSE DATA --",
      tagId: 0,
      tagName: "-- CHOOSE DATA --",
    };
    PrevTagData.push(newData);
    EventInfoDispatch({
      type: "UPDATE_TAGINFO",
      data: {
        TagInformation: { value: PrevTagData, isChange: true },
      },
    });
  };

  return (
    <>
      <SectionTitle text="Tag Information" />
      <Table>
        <tr>
          <th className="orderInputCell">Order</th>
          <th>Tag Type</th>
          <th>Class</th>
          <th>Tag</th>
          <th className="buttonCell">
            <RowButton onClick={(e) => addRow(e)}>
              <PlusIcon size={19} />
            </RowButton>
          </th>
        </tr>
        {EventInfoState.TagInformation.value.map((eachRow) => (
          <TagDataRow data={eachRow} />
        ))}
      </Table>
    </>
  );
};
