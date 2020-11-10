import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { EventInfoContext } from "./CreateEventContainer";

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
`;

export default () => {
  const { EventInfoState } = useContext(EventInfoContext);

  return (
    <>
      <SectionTitle text="Basic Status" />
      <Table>
        <tr>
          <th>Total Likes</th>
          <td>{EventInfoState.BasicStatus.likesNum} Likes</td>
          <th>Total Views</th>
          <td>{EventInfoState.BasicStatus.viewsNum} Views</td>
        </tr>
        <tr>
          <th>Registration Date</th>
          <td>{EventInfoState.BasicStatus.RegistrationDate}</td>
          <th>Last Updated</th>
          <td>{EventInfoState.BasicStatus.LastUpdated}</td>
        </tr>
      </Table>
    </>
  );
};
