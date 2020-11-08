import React, { useContext } from "react";
import styled from "styled-components";
import { ProductInfoContext } from "../CreateProductContainer";
import BranchRowData from "./BranchRowData";
import { GET_BRANCHES } from "../CreateProductQueries";
import { useQuery } from "react-apollo-hooks";

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
    width: ${(props) => {
      if (props.CellWidth) {
        return props.CellWidth.toString() + "px";
      } else {
        return null;
      }
    }};
  }
  .orderInputCell,
  .buttonCell {
    width: 85px;
  }
  .AddressCell {
    width: 410px;
  }
  .MapUrlCell {
    width: 730px;
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
        <tr>
          <th className="orderInputCell">Branch ID</th>
          <th>Branch Name</th>
          <th>Phone Number</th>
          <th className="AddressCell">Address</th>
          <th className="buttonCell">Select</th>
        </tr>
      </Table>
    );
  }
  if (!branchLoading && branchData) {
    return (
      <Table>
        <tr>
          <th className="orderInputCell">Branch ID</th>
          <th>Branch Name</th>
          <th>Phone Number</th>
          <th className="AddressCell">Address</th>
          <th className="buttonCell"> Select</th>
        </tr>
        {branchData.getProductSellingShopBranch.branches.map((eachRow) => (
          <BranchRowData data={eachRow} />
        ))}
      </Table>
    );
  }
};
