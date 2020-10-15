import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  tr,
  td,
  th {
    border: ${(props) => props.theme.tableBorder};
  }
  td,
  th {
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
  }
  .tagNameCell {
    display: flex;
    justify-content: space-around;
    border: 0;
  }
`;

export const DashboardTopShop = ({ data }) => (
  <>
    <SectionTitle text={"Top 5 Shop"} />
    <Table>
      <tr>
        <th>No</th>
        <th>Shop ID</th>
        <th>shopName</th>
        <th>phoneNumber</th>
        <th>address</th>
        <th>tagNames</th>
        <th>rankNum</th>
        <th>weight</th>
        <th>postNum</th>
        <th>productNum</th>
        <th>likeNum</th>
        <th>viewNum</th>
      </tr>
      {data.map((eachShop) => (
        <tr>
          <td>{eachShop.No}</td>
          <td>{eachShop.shopId}</td>
          <td>{eachShop.shopName}</td>
          <td>{eachShop.phoneNumber}</td>
          <td>{eachShop.address}</td>
          <td className="tagNameCell">
            {eachShop.tagNames.map((eachTagName) => (
              <div>{eachTagName}</div>
            ))}
          </td>
          <td>{eachShop.rankNum}</td>
          <td>{eachShop.weight}</td>
          <td>{eachShop.postNum}</td>
          <td>{eachShop.productNum}</td>
          <td>{eachShop.likeNum}</td>
          <td>{eachShop.viewNum}</td>
        </tr>
      ))}
    </Table>
  </>
);
