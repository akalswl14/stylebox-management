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

  const installationDate = getFormatDate(new Date(data.installationDate));

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
      <td>{installationDate}</td>
      <td>{data.PostLikeNum}</td>
      <td>{data.ShopLikeNum}</td>
      <td>{data.EventLikeNum}</td>
    </tr>
  );
};

const getFormatDate = (date) => {
  let year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  let hour = date.getHours();
  hour = hour >= 10 ? hour : "0" + hour;
  let minute = date.getMinutes();
  minute = minute >= 10 ? minute : "0" + minute;
  let seconds = date.getSeconds();
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
  );
};

export default UserDataRow;
