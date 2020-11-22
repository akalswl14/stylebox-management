import React, { useEffect } from "react";
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
  feedState,
  setFeedState,
  todayStylePeriod,
  setTodayStylePeriod,
  onChange,
  onShopReset,
  onPostReset,
  onSubmit,
  onShopResetPriority,
  ChangeSearchDate,
  ChangeStyleDate,
  isData,
  setIsData,
}) => {
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    useEffect(() => {
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
        TodaysStylesPeriod: data.getTodaysStylesPeriod.period,
        postNum: data.getTodaysStylesPeriod.postNum,
      };
      setTodayStylePeriod(defaultTodayperiod);
      setIsData(true);
    }, []);

    if (!isData) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      );
    } else {
      return (
        <>
          <WrapPage>
            <form onSubmit={onSubmit}>
              <PageTitle text={"Feed Management"} />
              <MainFeed
                todayStylePeriod={todayStylePeriod}
                ChangeStyleDate={ChangeStyleDate}
              />
              <SearchFeed
                feedState={feedState}
                ChangeSearchDate={ChangeSearchDate}
              />
              <BestFeed feedState={feedState} onChange={onChange} />
              <ShopRank
                feedState={feedState}
                onChange={onChange}
                onShopResetPriority={onShopResetPriority}
                onShopReset={onShopReset}
              />
              <PostRank
                feedState={feedState}
                onChange={onChange}
                onPostReset={onPostReset}
              />
            </form>
          </WrapPage>
        </>
      );
    }
  }
};
