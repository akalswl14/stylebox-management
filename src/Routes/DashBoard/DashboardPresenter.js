import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { useQuery } from "react-apollo-hooks";
import { DASHBOARD_BASICSTATUS } from "./DashboardQueries";
import SectionTitle from "../../Components/SectionTitle";
import PageTitle from "../../Components/PageTitle";
import LinkButton from "../../Components/LinkButton";

const Wrapper = styled.div`
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  tr {
    border: 1px solid #858585;
  }
  td {
    border: 1px solid #858585;
    padding: 8px;
    /* display: ; */
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
const Header = styled.header`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export default ({ action, setAction }) => {
  console.log(action);
  const { loading, error, data } = useQuery(DASHBOARD_BASICSTATUS);
  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data)
    return (
      <Wrapper>
        <Header>
          <PageTitle text={"DASH BOARD"} />
        </Header>
        <Header>
          <SectionTitle text={"BasicStatus"} />
        </Header>
        <Table>
          <tr>
            <td className="tableTitle">Total Number of Shops</td>
            <td colSpan="3">
              <div className="linkCell">
                <div className="NumCell">
                  {data.getDashboardBasicStatus.ShopNum} Shops
                </div>
                <LinkButton href="/example" text={"example Link"}></LinkButton>
              </div>
            </td>
            <td className="tableTitle">Total Number of Users</td>
            <td colSpan="3">
              <div className="linkCell">
                <div className="NumCell">
                  {data.getDashboardBasicStatus.UserNum} Users
                </div>
                <LinkButton href="/example" text={"example Link"}></LinkButton>
              </div>
            </td>
          </tr>
          <tr>
            <td className="tableTitle">Total Number of Posts</td>
            <td colSpan="3">
              <div className="linkCell">
                <div className="NumCell">
                  {data.getDashboardBasicStatus.PostNum} Posts
                </div>
                <LinkButton href="/example" text={"example Link"}></LinkButton>
              </div>
            </td>
            <td className="tableTitle">Total Number of Products</td>
            <td colSpan="3">
              <div className="linkCell">
                <div className="NumCell">
                  {data.getDashboardBasicStatus.ProductNum} Products
                </div>
                <LinkButton href="/example" text={"example Link"}></LinkButton>
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
            <td>{data.getDashboardBasicStatus.AvgShopLikeNum}</td>
            <td>{data.getDashboardBasicStatus.AvgPostLikeNum}</td>
            <td>{data.getDashboardBasicStatus.AvgEventLikeNum}</td>
            <td className="tableTitle">Total Likes</td>
            <td>{data.getDashboardBasicStatus.TotalShopLikeNum}</td>
            <td>{data.getDashboardBasicStatus.TotalPostLikeNum}</td>
            <td>{data.getDashboardBasicStatus.TotalEventLikeNum}</td>
          </tr>
          <tr>
            <td className="tableTitle">Avg.Views</td>
            <td>{data.getDashboardBasicStatus.AvgShopViewNum}</td>
            <td>{data.getDashboardBasicStatus.AvgPostViewNum}</td>
            <td>{data.getDashboardBasicStatus.AvgEventViewNum}</td>
            <td className="tableTitle">Total Views</td>
            <td>{data.getDashboardBasicStatus.TotalShopViewNum}</td>
            <td>{data.getDashboardBasicStatus.TotalPostViewNum}</td>
            <td>{data.getDashboardBasicStatus.TotalEventViewNum}</td>
          </tr>
        </Table>
        <Header>
          <SectionTitle text={"Top 5 Shop"} />
        </Header>
        <Header>
          <SectionTitle text={"Top 5 Post"} />
        </Header>
      </Wrapper>
    );
};
