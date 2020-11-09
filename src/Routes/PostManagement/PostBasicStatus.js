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

const ButtonBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const PostBasicStatus = () => {
  const { postDispatch, postState } = useContext(PostInfoContext);
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Basic Information"} />
      </TitleBox>
      <Table>
        <tr>
          <td>Post Rank</td>
          <td>포스트 랭크 자리!</td>
          <td>Post Priority</td>
          <td>
            <select>
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
          <td>라이크개수 Likes</td>
          <td>Total Views</td>
          <td>뷰 수 Views</td>
        </tr>
        <tr>
          <td>Registration Date</td>
          <td>날짜 자리</td>
          <td>Last Updated</td>
          <td>날짜 자리</td>
        </tr>
      </Table>
    </>
  );
};

export default PostBasicStatus;
