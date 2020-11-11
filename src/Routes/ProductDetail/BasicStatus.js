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

  return (
    <>
      <SectionTitle text="Basic Status" />
      <Table>
        <tr>
          <th>Total Number of Posts</th>
          <td colSpan="3" className="smallerCell">
            # {ProductInfoState.BasicStatus.TotalNumberofPosts}
          </td>
        </tr>
        <tr>
          <th>Registration Date</th>
          <td>{ProductInfoState.BasicStatus.RegistrationData}</td>
          <th>Last Updated</th>
          <td>{ProductInfoState.BasicStatus.LastUpdated}</td>
        </tr>
      </Table>
    </>
  );
};
