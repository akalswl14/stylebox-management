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
    width : 25%;
  }
`;

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchFeed = ({feedState, onChange}) => {
  const date = feedState.SearchPeriod;
  const dateArr = date.split('T');
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Search Feed"} />
      </TitleBox>
      <Table>
        <tr>
          <td>Open Posts from</td>
          <td>
            <input
              name="SearchPeriod"
              type="date"
              value={dateArr[0]}
              onChange={onChange}
            />
          </td>
        </tr>
      </Table>
    </>
  );
};

export default SearchFeed;
