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
  .NumCell {
    padding: 7px 0px;
  }
`;

export const ShopTagIcon = ({ setAction }) => {
  return (
    <>
      <SectionTitle text={"Tag Icon Management ( in Shop Page )"} />
      <Table>
        <tr>
          <th>Order</th>
          <th>Category</th>
          <th>Class</th>
          <th>Tag</th>
          <th>플러스아이콘</th>
        </tr>
        <tr>
          <td>텍스트박스</td>
          <td>드롭다운</td>
          <td>드롭다운</td>
          <td>드롭다운</td>
          <td>삭제아이콘</td>
        </tr>
      </Table>
    </>
  );
};
