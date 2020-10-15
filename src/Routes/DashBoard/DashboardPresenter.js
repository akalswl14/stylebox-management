<<<<<<< Updated upstream
import React from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import Loader from "../../Components/Loader";
import SectionTitle from "../../Components/SectionTitle";
import PageTitle from "../../Components/PageTitle";
import { DashboardBasicStatus } from "./BasicStatus";
import { DashboardTopShop } from "./TopShop";
import { DashboardTopPost } from "./TopPost";
=======
import React from 'react';
import styled from 'styled-components';
import Loader from '../../Components/Loader';
import { useQuery } from 'react-apollo-hooks';
import { DASHBOARD_BASICSTATUS } from './DashboardQueries';
import SectionTitle from '../../Components/SectionTitle';
import PageTitle from '../../Components/PageTitle';
import LinkButton from '../../Components/LinkButton';
>>>>>>> Stashed changes

const Wrapper = styled.div`
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export default ({
  loading,
  error,
  data,
  setAction,
  loading_post,
  error_post,
  data_post,
}) => {
  if (error || error_post) return `Error! ${error.message}`;
  if (loading || loading_post)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data && data_post)
    return (
<<<<<<< Updated upstream
      <WrapPage>
        <PageTitle text={"DASH BOARD"} />
        <DashboardBasicStatus data={data.getDashboardBasicStatus} />
        <DashboardTopShop data={data.getTopShops} />
        <DashboardTopPost data={data_post.getTopPosts} setAction={setAction} />
      </WrapPage>
=======
      <Wrapper>
        <Header>
          <PageTitle text={'DASH BOARD'} />
        </Header>
        <Header>
          <SectionTitle text={'BasicStatus'} />
        </Header>
        <Table>
          <tr>
            <td className='tableTitle'>Total Number of Shops</td>
            <td colSpan='3'>
              <div className='linkCell'>
                <div className='NumCell'>
                  {data.getDashboardBasicStatus.ShopNum} Shops
                </div>
                <LinkButton href='/example' text={'example Link'}></LinkButton>
              </div>
            </td>
            <td className='tableTitle'>Total Number of Users</td>
            <td colSpan='3'>
              <div className='linkCell'>
                <div className='NumCell'>
                  {data.getDashboardBasicStatus.UserNum} Users
                </div>
                <LinkButton href='/example' text={'example Link'}></LinkButton>
              </div>
            </td>
          </tr>
          <tr>
            <td className='tableTitle'>Total Number of Posts</td>
            <td colSpan='3'>
              <div className='linkCell'>
                <div className='NumCell'>
                  {data.getDashboardBasicStatus.PostNum} Posts
                </div>
                <LinkButton href='/example' text={'example Link'}></LinkButton>
              </div>
            </td>
            <td className='tableTitle'>Total Number of Products</td>
            <td colSpan='3'>
              <div className='linkCell'>
                <div className='NumCell'>
                  {data.getDashboardBasicStatus.ProductNum} Products
                </div>
                <LinkButton href='/example' text={'example Link'}></LinkButton>
              </div>
            </td>
          </tr>
          <tr>
            <td className='tableTitle'></td>
            <td className='tableTitle'>Shop</td>
            <td className='tableTitle'>Post</td>
            <td className='tableTitle'>Event</td>
            <td className='tableTitle'></td>
            <td className='tableTitle'>Shop</td>
            <td className='tableTitle'>Post</td>
            <td className='tableTitle'>Event</td>
          </tr>
          <tr>
            <td className='tableTitle'>Avg.Likes</td>
            <td>{data.getDashboardBasicStatus.AvgShopLikeNum}</td>
            <td>{data.getDashboardBasicStatus.AvgPostLikeNum}</td>
            <td>{data.getDashboardBasicStatus.AvgEventLikeNum}</td>
            <td className='tableTitle'>Total Likes</td>
            <td>{data.getDashboardBasicStatus.TotalShopLikeNum}</td>
            <td>{data.getDashboardBasicStatus.TotalPostLikeNum}</td>
            <td>{data.getDashboardBasicStatus.TotalEventLikeNum}</td>
          </tr>
          <tr>
            <td className='tableTitle'>Avg.Views</td>
            <td>{data.getDashboardBasicStatus.AvgShopViewNum}</td>
            <td>{data.getDashboardBasicStatus.AvgPostViewNum}</td>
            <td>{data.getDashboardBasicStatus.AvgEventViewNum}</td>
            <td className='tableTitle'>Total Views</td>
            <td>{data.getDashboardBasicStatus.TotalShopViewNum}</td>
            <td>{data.getDashboardBasicStatus.TotalPostViewNum}</td>
            <td>{data.getDashboardBasicStatus.TotalEventViewNum}</td>
          </tr>
        </Table>
        <Header>
          <SectionTitle text={'Top 5 Shop'} />
        </Header>
        <Header>
          <SectionTitle text={'Top 5 Post'} />
        </Header>
      </Wrapper>
>>>>>>> Stashed changes
    );
};
