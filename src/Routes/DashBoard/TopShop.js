import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";

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
  }
  td:first-child,
  th:first-child {
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
  }
  .tagNameCell {
    justify-content: space-evenly;
    border: 0;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

const TagSpan = styled.span`
  font-weight: 500;
  .commanSpan {
    font-weight: 100;
    color: red;
  }
`;

export const DashboardTopShop = ({ data }) => (
  <>
    <SectionTitle text={"Top 5 Shop"} />
    <Table>
      <thead>
        <tr>
          <th>No</th>
          <th>Shop ID</th>
          <th>shopName</th>
          <th>address</th>
          <th>tagNames</th>
          <th>rankNum</th>
          <th>weight</th>
          <th>postNum</th>
          <th>productNum</th>
          <th>likeNum</th>
          <th>viewNum</th>
        </tr>
      </thead>
      <tbody>
        {data.map((eachShop, index) => (
          <tr key={index}>
            <td>{eachShop.No}</td>
            <td>{eachShop.shopId}</td>
            <td>{eachShop.shopName}</td>
            <td>{eachShop.address}</td>
            <td className="tagNameCell">
              {eachShop.tagNames.map((eachTagName, index) => {
                if (index === eachShop.tagNames.length - 1) {
                  return <TagSpan key={index}>{eachTagName}</TagSpan>;
                } else {
                  return (
                    <TagSpan key={index}>
                      {eachTagName}
                      <TagSpan className="commanSpan"> / </TagSpan>
                    </TagSpan>
                  );
                }
              })}
            </td>
            <td>{eachShop.rankNum}</td>
            <td>{eachShop.weight}</td>
            <td>{eachShop.postNum}</td>
            <td>{eachShop.productNum}</td>
            <td>{eachShop.likeNum}</td>
            <td>{eachShop.viewNum}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
);
