import React from "react";
import WrapPage from "../../Styles/WrapPageStyles";
import styled from "styled-components";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import MainFeed from "./MainFeed";
import SearchFeed from "./SearchFeed";
import BestFeed from "./BestFeed";
import ShopRank from "./ShopRank";
import PostRank from "./PostRank";

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
  data, 
  setalreadyGetData, 
  alreadyGetData, 
  feedState, 
  setFeedState,
  todayStylePeriod,
  setTodayStylePeriod,
  onChange,
  resetShopPriority,
  onShopReset,
  onPostReset,
  updateLoading,
  updateError,
  resetLoading,
  resetError,
  onSubmit
}) => {
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if(!loading && data){
    if (!alreadyGetData) {
      const defaultFeed = {
        TodaysStylesPeriod: data.getTodaysStylesPeriod.period,
        SearchPeriod: data.getSearchPeriod,
        BestRankNum: data.getBestFeedNum,
        shopConstA: data.getPostAlgorithm.bestConstA,
        shopConstB: data.getPostAlgorithm.bestConstB,
        shopConstC: data.getShopAlgorithm.shopConstA,
        postConstA: data.getShopAlgorithm.shopConstB,
        postConstB: data.getShopAlgorithm.shopConstC,
      };
      setFeedState(defaultFeed);
      const defaultTodayperiod = {
        TodaysStylesPeriod : data.getTodaysStylesPeriod.period,
        postNum : data.getTodaysStylesPeriod.postNum
      }
      setTodayStylePeriod(defaultTodayperiod);
      setalreadyGetData(true);
    }
    return (
      <>
        <WrapPage>
          <form onSubmit={onSubmit}>
            <PageTitle text={"Feed Management"} />
            <MainFeed todayStylePeriod={todayStylePeriod} onChange={onChange}/>
            <SearchFeed feedState={feedState} onChange={onChange}/>
            <BestFeed feedState={feedState} onChange={onChange}/>
            <ShopRank feedState={feedState} onChange={onChange} resetShopPriority={resetShopPriority} onShopReset={onShopReset}/>
            <PostRank feedState={feedState} onChange={onChange} onPostReset={onPostReset}/>
          </form>
          {updateLoading && <p>update Loading...</p>}
          {resetLoading && <p>reset Loading...</p>}
          {updateError && <p>Error : Please try again</p>}
          {resetError && <p>Error : Please try again</p>}
        </WrapPage>
      </>
    );
  }
};
