import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td {
    padding: 5px;
    vertical-align: middle;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:first-child {
    width: 25%;
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const BestFeed = ({ feedState, onChange }) => {
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Best Feed"} />
      </TitleBox>
      <Table>
        <tbody>
          <tr>
            <td>Number of Rank</td>
            <td>
              <input
                name="BestRankNum"
                type="text"
                value={feedState.BestRankNum}
                onChange={onChange}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default BestFeed;
