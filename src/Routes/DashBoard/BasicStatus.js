import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import LinkButton from "../../Components/LinkButton";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  tr {
    border: ${(props) => props.theme.tableBorder};
  }
  td {
    border: ${(props) => props.theme.tableBorder};
    padding: 8px;
  }
  .tableTitle {
    background-color: #f2f2f2;
  }
  .linkCell {
    display: flex;
    justify-content: space-around;
  }
  .NumCell {
    padding: 7px 0px;
  }
`;

export const DashboardBasicStatus = ({ data }) => (
  <>
    <SectionTitle text={"BasicStatus"} />
    <Table>
      <tr>
        <td className="tableTitle">Total Number of Shops</td>
        <td colSpan="3">
          <div className="linkCell">
            <div className="NumCell">{data.ShopNum} Shops</div>
            <LinkButton link={"/example"} text={"Go to Shop List"}></LinkButton>
          </div>
        </td>
        <td className="tableTitle">Total Number of Users</td>
        <td colSpan="3">
          <div className="linkCell">
            <div className="NumCell">{data.UserNum} Users</div>
            <LinkButton
              link={"/userlist"}
              text={"Go to User List"}
            ></LinkButton>
          </div>
        </td>
      </tr>
      <tr>
        <td className="tableTitle">Total Number of Posts</td>
        <td colSpan="3">
          <div className="linkCell">
            <div className="NumCell">{data.PostNum} Posts</div>
            <LinkButton
              link={"/postlist"}
              text={"Go to Post List"}
            ></LinkButton>
          </div>
        </td>
        <td className="tableTitle">Total Number of Products</td>
        <td colSpan="3">
          <div className="linkCell">
            <div className="NumCell">{data.ProductNum} Products</div>
            <LinkButton
              link={"/productlist"}
              text={"Go to Product List"}
            ></LinkButton>
          </div>
        </td>
      </tr>
      <tr>
        <td className="tableTitle"></td>
        <td className="tableTitle">Shop</td>
        <td className="tableTitle">Post</td>
        <td className="tableTitle">Event</td>
        <td className="tableTitle"></td>
        <td className="tableTitle">Shop</td>
        <td className="tableTitle">Post</td>
        <td className="tableTitle">Event</td>
      </tr>
      <tr>
        <td className="tableTitle">Avg.Likes</td>
        <td>{data.AvgShopLikeNum}</td>
        <td>{data.AvgPostLikeNum}</td>
        <td>{data.AvgEventLikeNum}</td>
        <td className="tableTitle">Total Likes</td>
        <td>{data.TotalShopLikeNum}</td>
        <td>{data.TotalPostLikeNum}</td>
        <td>{data.TotalEventLikeNum}</td>
      </tr>
      <tr>
        <td className="tableTitle">Avg.Views</td>
        <td>{data.AvgShopViewNum}</td>
        <td>{data.AvgPostViewNum}</td>
        <td>{data.AvgEventViewNum}</td>
        <td className="tableTitle">Total Views</td>
        <td>{data.TotalShopViewNum}</td>
        <td>{data.TotalPostViewNum}</td>
        <td>{data.TotalEventViewNum}</td>
      </tr>
    </Table>
  </>
);
