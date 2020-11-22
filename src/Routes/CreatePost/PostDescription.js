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

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
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
