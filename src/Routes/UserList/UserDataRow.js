import React, { useContext } from "react";
import { UserListContext } from "./UserListContainer";

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
    <tr id={data.userId} key={data.userId}>
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
