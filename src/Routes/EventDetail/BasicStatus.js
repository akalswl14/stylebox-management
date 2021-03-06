import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { EventInfoContext } from "./EventDetailContainer";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  font-size: 15px;
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
    border-right: 0.5px solid black;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

const getFormatDate = (date) => {
  let year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  let hour = date.getHours();
  hour = hour >= 10 ? hour : "0" + hour;
  let minute = date.getMinutes();
  minute = minute >= 10 ? minute : "0" + minute;
  let seconds = date.getSeconds();
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
  );
};

export default () => {
  const { EventInfoState } = useContext(EventInfoContext);

  const registrationDate = getFormatDate(
    new Date(EventInfoState.BasicStatus.RegistrationDate)
  );
  const updatedDate = getFormatDate(
    new Date(EventInfoState.BasicStatus.LastUpdated)
  );

  return (
    <>
      <SectionTitle text="Basic Status" />
      <Table>
        <tbody>
          <tr>
            <th>Total Likes</th>
            <td>{EventInfoState.BasicStatus.likesNum} Likes</td>
            <th>Total Views</th>
            <td>{EventInfoState.BasicStatus.viewsNum} Views</td>
          </tr>
          <tr>
            <th>Registration Date</th>
            <td>{registrationDate}</td>
            <th>Last Updated</th>
            <td>{updatedDate}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
