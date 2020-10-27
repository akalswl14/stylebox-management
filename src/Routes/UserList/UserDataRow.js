import React, { useContext } from "react";
import styled from "styled-components";
import { UserListContext } from "./UserListContainer";

const OrderInputBox = styled.input`
  width: 30px;
  text-align: center;
`;

const TitleInputBox = styled.input`
  width: 150px;
  text-align: center;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

const UserDataRow = ({ data }) => {
  const { UserListState, UserListDispatch } = useContext(UserListContext);

  const ChangeCheckBox = (userId) => {
    UserListDispatch({
      type: "UPDATE_SELECTUSER",
      data: {
        userId,
      },
    });
  };

  return (
    <tr id={data.userId}>
      <td>
        <input
          type="checkbox"
          name="SelectInputBox"
          onChange={() => ChangeCheckBox(data.userId)}
          checked={
            UserListState.SelectedUserList.includes(data.userId) ? true : false
          }
        />
      </td>
      <td>{data.userId}</td>
      <td>{data.installationDate}</td>
      <td>{data.PostLikeNum}</td>
      <td>{data.ShopLikeNum}</td>
      <td>{data.EventLikeNum}</td>
    </tr>
  );
};

export default UserDataRow;
