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
    height: 200px;
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
    width: 20%;
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

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 15px;
`;

const PostDescription = () => {
  const { postDispatch, postState } = useContext(PostInfoContext);

  const onChange = (e) => {
    postDispatch({
      type: "UPDATE_DESCRIPTION",
      data: {
        postDescription: e.target.value,
      },
    });
  };

  return (
    <>
      <TitleBox>
        <SectionTitle text={"Post Description"} />
      </TitleBox>
      <Table>
        <tbody>
          <tr>
            <td>Post Description</td>
            <td>
              <TextArea value={postState.postDescription} onChange={onChange} />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PostDescription;
