import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  input {
    text-align: center;
  }
  tr {
    border: 1px solid #858585;
  }
  td:first-child {
    border: 1px solid #858585;
    padding: 8px;
    background-color: #f2f2f2;
    width: 25%;
  }
`;

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;


const BestFeed = ({feedState , onChange}) => {
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Best Feed"} />
      </TitleBox>
      <Table>
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
      </Table>
    </>
  );
};

export default BestFeed;
