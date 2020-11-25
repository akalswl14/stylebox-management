import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td {
    width : 12.5%
    padding: 5px;
    vertical-align: middle;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:first-child {
    padding: 8px;
    width: 12.5%;
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

const ButtonBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const PostRank = ({ feedState, onChange, onPostReset }) => {
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Post(Best) Rank Algorithm"} />
      </TitleBox>
      <Table>
        <tbody>
          <tr>
            <td>From</td>
            <td>ax+by</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Weight of Constants</td>
            <td>
              <span>
                a ={" "}
                <input
                  name="postConstA"
                  type="text"
                  value={feedState.postConstA}
                  onChange={onChange}
                />
              </span>
            </td>
            <td>
              <span>
                b ={" "}
                <input
                  name="postConstB"
                  type="text"
                  value={feedState.postConstB}
                  onChange={onChange}
                />
              </span>
            </td>
            <td>
              <ButtonBox onClick={onPostReset}>
                <Button text="Reset All"></Button>
              </ButtonBox>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PostRank;
