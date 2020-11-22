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
    vertical-align: middle;
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

  const { priority } = postState.basicStatus;

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
        </tbody>
      </Table>
    </>
  );
};

export default PostBasicStatus;
