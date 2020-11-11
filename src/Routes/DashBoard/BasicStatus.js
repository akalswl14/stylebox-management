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
  th {
    border: ${(props) => props.theme.tableBorder};
    background-color: #f2f2f2;
    padding: 8px;
  }
  td {
    padding: 8px;
  }
  .tableTitle {
    width: 15%;
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
      <tbody>
        <tr>
          <th className="tableTitle">Total Number of Shops</th>
          <td colSpan="3">
            <div className="linkCell">
              <div className="NumCell">{data.ShopNum} Shops</div>
              <LinkButton
                href={"/example"}
                text={"Go to Shop List"}
              ></LinkButton>
            </div>
          </td>
          <th className="tableTitle">Total Number of Users</th>
          <td colSpan="3">
            <div className="linkCell">
              <div className="NumCell">{data.UserNum} Users</div>
              <LinkButton
                href={"/userlist"}
                text={"Go to User List"}
              ></LinkButton>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th className="tableTitle">Total Number of Posts</th>
          <td colSpan="3">
            <div className="linkCell">
              <div className="NumCell">{data.PostNum} Posts</div>
              <LinkButton
                href={"/postlist"}
                text={"Go to Post List"}
              ></LinkButton>
            </div>
          </td>
          <th className="tableTitle">Total Number of Products</th>
          <td colSpan="3">
            <div className="linkCell">
              <div className="NumCell">{data.ProductNum} Products</div>
              <LinkButton
                href={"/productlist"}
                text={"Go to Product List"}
              ></LinkButton>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th className="tableTitle"></th>
          <th>Shop</th>
          <th>Post</th>
          <th>Event</th>
          <th className="tableTitle"></th>
          <th>Shop</th>
          <th>Post</th>
          <th>Event</th>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th className="tableTitle">Avg.Likes</th>
          <td>{Number(data.AvgShopLikeNum).toFixed(2)}</td>
          <td>{Number(data.AvgPostLikeNum).toFixed(2)}</td>
          <td>{Number(data.AvgEventLikeNum).toFixed(2)}</td>
          <th className="tableTitle">Total Likes</th>
          <td>{Number(data.TotalShopLikeNum).toFixed(2)}</td>
          <td>{Number(data.TotalPostLikeNum).toFixed(2)}</td>
          <td>{Number(data.TotalEventLikeNum).toFixed(2)}</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th className="tableTitle">Avg.Views</th>
          <td>{Number(data.AvgShopViewNum).toFixed(2)}</td>
          <td>{Number(data.AvgPostViewNum).toFixed(2)}</td>
          <td>{Number(data.AvgEventViewNum).toFixed(2)}</td>
          <th className="tableTitle">Total Views</th>
          <td>{Number(data.TotalShopViewNum).toFixed(2)}</td>
          <td>{Number(data.TotalPostViewNum).toFixed(2)}</td>
          <td>{Number(data.TotalEventViewNum).toFixed(2)}</td>
        </tr>
      </tbody>
    </Table>
  </>
);
