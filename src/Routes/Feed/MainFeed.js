import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

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
  td {
    width : 25%;
  }
  td:nth-child(odd) {
    border: 1px solid #858585;
    padding: 8px;
    background-color: #f2f2f2;
  }
`;

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ButtonBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const MainFeed = ({todayStylePeriod , onChange}) => {
  const date = todayStylePeriod.TodaysStylesPeriod;
  const dateArr = date.split('T');
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Main(Home) Feed"} />
        <ButtonBox>
          <Link to="/">
            <Button text="Back To Main"></Button>
          </Link>
          <Button type="submit" text="Confirm"></Button>
        </ButtonBox>
      </TitleBox>
      <Table>
        <tr>
          <td>Open Posts from</td>
          <td>
            <input
              name="TodaysStylesPeriod"
              type="date"
              value={dateArr[0]}
              onChange={onChange}
            />
          </td>
          <td>Open Posts</td>
          <td>{todayStylePeriod.postNum} posts</td>
        </tr>
      </Table>
    </>
  );
};

export default MainFeed;
