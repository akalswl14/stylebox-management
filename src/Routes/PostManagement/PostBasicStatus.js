import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { PostInfoContext } from "./PostInfoContainer";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  input {
    text-align: center;
    width: 180px;
  }
  tr {
    border: 1px solid #858585;
  }
  td {
    width: 25%;
    padding: 0px 25px;
  }
  td:nth-child(odd) {
    text-align: center;
    width: 13%;
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
        <tr>
          <td>Post Rank</td>
          <td>
            Weekly:#{weeklyRank}&nbsp; Monthly:#{monthlyRank}&nbsp; Total:#
            {totalRank}
          </td>
          <td>Post Priority</td>
          <td>
            <select value={priority} onChange={onChange}>
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
      </Table>
    </>
  );
};

export default PostBasicStatus;
