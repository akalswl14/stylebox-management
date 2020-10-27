import React, { useContext } from "react";
import styled from "styled-components";
import { TagListContext } from "./TagListContainer";
import Button from "../../Components/Button";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  input {
    text-align: center;
  }
  th:first-child {
    width: 13%;
    padding: 12px;
    border-right: 1px solid #858585;
    background-color: #f2f2f2;
  }
  th {
    padding: 12px;
    border: 1px solid #858585;
    background-color: #f2f2f2;
  }
  tr {
    border: 1px solid #858585;
  }
  td {
    padding: 3px;
  }
  td:first-child {
    border: 1px solid #858585;
  }
`;

const TagListTable = () => {
  const { tagState } = useContext(TagListContext);
  return (
    <Table>
      <th>select box</th>
      <th>Tag Id</th>
      <th>Tag Name</th>
      <th>Category</th>
      <th>Class</th>
      <th>Shops</th>
      <th>Posts</th>
      <th>Product</th>
      <th>Edit</th>
      {tagState.TagListData.map((tag) => (
        <tr>
          <td>
            <input type="checkbox" name="tagId" value={tag.tagId} />
          </td>
          <td>{tag.tagId}</td>
          <td>{tag.tagName}</td>
          <td>{tag.category}</td>
          <td>{tag.className}</td>
          <td>{tag.postNum}</td>
          <td>{tag.shopNum}</td>
          <td>{tag.productNum}</td>
          <td>
            <Button text="Edit"></Button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default TagListTable;
