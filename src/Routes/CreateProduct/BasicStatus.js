import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { ProductInfoContext } from "./CreateProductContainer";

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
  .smallerCell {
    width: 400px;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

export default () => {
  const { ProductInfoState } = useContext(ProductInfoContext);

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
            <td>{ProductInfoState.BasicStatus.RegistrationData}</td>
            <th>Last Updated</th>
            <td>{ProductInfoState.BasicStatus.LastUpdated}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
