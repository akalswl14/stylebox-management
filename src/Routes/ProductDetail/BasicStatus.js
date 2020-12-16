import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { ProductInfoContext } from "./ProductDetailContainer";

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

const Input = styled.input`
  width: ${(props) => {
    if (props.InputWidth) {
      return props.InputWidth.toString() + "px";
    } else {
      return null;
    }
  }};
  height: 35px;
  font-size: 15px;
  text-align: center;
`;

export default () => {
  const { ProductInfoState } = useContext(ProductInfoContext);

  const registrationDate = getFormatDate(
    new Date(ProductInfoState.BasicStatus.RegistrationData)
  );
  const updatedDate = getFormatDate(
    new Date(ProductInfoState.BasicStatus.LastUpdated)
  );

  return (
    <>
      <SectionTitle text="Basic Status" />
      <Table>
        <tbody>
          <tr>
            <th>Total Number of Posts</th>
            <td colSpan="3" className="smallerCell">
              # {ProductInfoState.BasicStatus.TotalNumberofPosts}
            </td>
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
