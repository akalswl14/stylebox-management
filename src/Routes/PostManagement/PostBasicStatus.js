import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { PostInfoContext } from "./PostInfoContainer";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td {
    padding: 10px;
    vertical-align: middle;
    width: 25%;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:nth-child(odd) {
    width: 15%;
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

const PostBasicStatus = () => {
  const { postDispatch, postState } = useContext(PostInfoContext);

  const {
    weeklyRank,
    monthlyRank,
    totalRank,
    priority,
    likesNum,
    viewsNum,
    createdAt,
    updatedAt,
  } = postState.basicStatus;

  let RegistrationDate = String(createdAt).split("T");
  let UpdatedDate = String(updatedAt).split("T");
  let UpdatedTime = String(UpdatedDate[1]).split(".");

  const onChange = (e) => {
    const { value } = e.target;
    postDispatch({
      type: "CHANGE_BASICSTATUS",
      data: {
        value,
      },
    });
  };

  return (
    <>
      <TitleBox>
        <SectionTitle text={"Basic Status"} />
      </TitleBox>
      <Table>
        <tbody>
          <tr>
            <td>Post Rank</td>
            <td>
              Weekly:#{weeklyRank}&nbsp; Monthly:#{monthlyRank}&nbsp; Total:#
              {totalRank}
            </td>
            <td>Post Priority</td>
            <td>
              <select value={priority ? priority : 1} onChange={onChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Total Likes</td>
            <td>{likesNum} Likes</td>
            <td>Total Views</td>
            <td>{viewsNum} Views</td>
          </tr>
          <tr>
            <td>Registration Date</td>
            <td>{RegistrationDate[0]}</td>
            <td>Last Updated</td>
            <td>
              {UpdatedDate[0]} {UpdatedTime[0]}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PostBasicStatus;
