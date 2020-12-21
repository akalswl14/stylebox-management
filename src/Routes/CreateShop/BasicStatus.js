import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { ShopInfoContext } from "./CreateShopContainer";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  font-size: 15px;
  tr {
    height: 40px;
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    border-right: 0.5px solid black;
  }
  .smallerCell {
    width: 400px;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
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

export default () => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "WeightInput") {
      ShopInfoDispatch({
        type: "UPDATE_BASICSTATUS",
        data: {
          BasicStatus: {
            ...ShopInfoState.BasicStatus,
            RankingWeight: e.target.value,
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
                value={ShopInfoState.BasicStatus.RankingWeight}
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
              {ShopInfoState.BasicStatus.TotalViews} Likes
            </td>
          </tr>
          <tr>
            <th>Registration Date</th>
            <td>{ShopInfoState.BasicStatus.RegistrationData}</td>
            <th>Last Updated</th>
            <td>{ShopInfoState.BasicStatus.LastUpdated}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
