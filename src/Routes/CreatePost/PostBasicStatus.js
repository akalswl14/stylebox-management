import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { PostInfoContext } from "./PostInfoContainer";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    border-bottom: 0.5px solid black;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:first-child,
  th:first-child {
    width: 18.7%;
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
