import React, { useContext } from "react";
import styled from "styled-components";
import { ProductInfoContext } from "../CreateProductContainer";
import BranchRowData from "./BranchRowData";
import { GET_BRANCHES } from "../CreateProductQueries";
import { useQuery } from "react-apollo-hooks";

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
    border-bottom: 0.5px solid black;
    width: 23.2%;
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
  .AddressCell {
    width: 40%;
  }
`;

export default () => {
  const { ProductInfoState } = useContext(ProductInfoContext);

  const {
    loading: branchLoading,
    data: branchData,
    error: branchError,
  } = useQuery(GET_BRANCHES, {
    variables: { shopId: ProductInfoState.SelectedShop.shopId },
  });

  if (branchError || branchLoading) {
    return (
      <Table>
        <thead>
          <tr>
            <th className="orderInputCell">Branch ID</th>
            <th>Branch Name</th>
            <th>Phone Number</th>
            <th className="AddressCell">Address</th>
            <th className="buttonCell">Select</th>
          </tr>
        </thead>
      </Table>
    );
  }
  if (!branchLoading && branchData) {
    return (
      <Table>
        <thead>
          <tr>
            <th className="orderInputCell">Branch ID</th>
            <th>Branch Name</th>
            <th>Phone Number</th>
            <th className="AddressCell">Address</th>
            <th className="buttonCell"> Select</th>
          </tr>
        </thead>
        <tbody>
          {branchData.getProductSellingShopBranch.branches.map(
            (eachRow, index) => (
              <BranchRowData data={eachRow} key={index} />
            )
          )}
        </tbody>
      </Table>
    );
  }
};
