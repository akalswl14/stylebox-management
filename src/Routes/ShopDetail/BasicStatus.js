import React, { useContext } from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import SectionTitle from "../../Components/SectionTitle";
import { ShopInfoContext } from "./ShopDetailContainer";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  font-size: 15px;
  tr {
    height: 40px;
  }
  tr,
  td,
  th {
    border: ${(props) => props.theme.tableBorder};
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
  }
  .smallerCell {
    width: 400px;
  }
`;

const Input = styled.input`
  width: ${(props) => {
    if (props.InputWidth) {
      return props.InputWidth.toString() + "px";
    } else {
      return null;
    }
  }};
  height: 35px;
  font-size: 15px;
  text-align: center;
`;

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

export default () => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  const registrationDate = getFormatDate(
    new Date(ShopInfoState.BasicStatus.RegistrationData)
  );
  const updatedDate = getFormatDate(
    new Date(ShopInfoState.BasicStatus.LastUpdated)
  );

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "WeightInput") {
      ShopInfoDispatch({
        type: "UPDATE_BASICSTATUS",
        data: {
          BasicStatus: {
            ...ShopInfoState.BasicStatus,
            RankingWeight: {
              value: e.target.value,
              isChange: true,
            },
          },
        },
      });
    }
  };

  return (
    <>
      <SectionTitle text="Basic Status" />
      <Table>
        <tbody>
          <tr>
            <th>Shop Rank</th>
            <td className="smallerCell">
              # {ShopInfoState.BasicStatus.ShopRank}
            </td>
            <th>Ranking Weight</th>
            <td>
              <Input
                InputWidth={100}
                type="text"
                name="WeightInput"
                value={ShopInfoState.BasicStatus.RankingWeight.value}
                onChange={(e) => onChange(e)}
              />{" "}
            </td>
          </tr>
          <tr>
            <th>Total Number of Posts</th>
            <td className="smallerCell">
              {ShopInfoState.BasicStatus.TotalNumberofPosts} Posts
            </td>
            <th>Total Number of Products</th>
            <td className="smallerCell">
              {ShopInfoState.BasicStatus.TotalNumberofProducts} Products
            </td>
          </tr>
          <tr>
            <th>Total Likes</th>
            <td className="smallerCell">
              {ShopInfoState.BasicStatus.TotalLikes} Likes
            </td>
            <th>Total Views</th>
            <td className="smallerCell">
              {ShopInfoState.BasicStatus.TotalViews} Views
            </td>
          </tr>
          <tr>
            <th>Registration Date</th>
            <td>{registrationDate}</td>
            <th>Last Updated</th>
            <td>{updatedDate}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
