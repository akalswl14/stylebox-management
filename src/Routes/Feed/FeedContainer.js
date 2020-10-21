import React , {useState} from "react";
import FeedPresenter from "./FeedPresenter";
import { useQuery , useMutation } from "react-apollo-hooks";
import { FEED_QUERY, RESET_MUTATION , FEED_MUTATION } from "./FeedQueries"

export default () => {
  const { loading, data } = useQuery(FEED_QUERY);
  const [
    resetShopPriority,
    { loading: resetLoading, error: resetError },
  ] = useMutation(RESET_MUTATION);
  const [
    updateFeedSetting,
    { loading: updateLoading, error: updateError },
  ] = useMutation(FEED_MUTATION);
  
  const [alreadyGetData, setalreadyGetData] = useState(false);
  const [feedState, setFeedState] = useState({
    TodaysStylesPeriod: "",
    SearchPeriod: "",
    BestRankNum: 1,
    shopConstA: 1,
    shopConstB: 1,
    shopConstC: 1,
    postConstA: 1,
    postConstB: 1,
  })
  const [todayStylePeriod , setTodayStylePeriod] = useState({
    TodaysStylesPeriod : "",
    postNum : 0
  })

  const onChange = (e) => {
    const { value, name } = e.target;
    if(name === "TodaysStylesPeriod"){
      setTodayStylePeriod({
        ...todayStylePeriod,
        [name] : value,
      })
    }
    if(name === "TodaysStylesPeriod" || name === "SearchPeriod"){
      setFeedState({
        ...feedState,
        [name]: value + "T00:00:00.000Z",
      });
    }
    else{
      setFeedState({
        ...feedState,
        [name]: Number(value),
      });
    }
  }

  const onShopReset = (e) => {
    e.preventDefault();
    setFeedState({
      ...feedState,
      shopConstA: 1,
      shopConstB: 1,
      shopConstC: 1,
    })
  }

  const onPostReset = (e) => {
    e.preventDefault();
    setFeedState({
      ...feedState,
      postConstA: 1,
      postConstB: 1,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    updateFeedSetting({
      variables: feedState,
    });
  };
  
  return (
    <FeedPresenter
      loading={loading}
      data={data}
      setalreadyGetData={setalreadyGetData}
      alreadyGetData={alreadyGetData}
      feedState={feedState}
      setFeedState={setFeedState}
      todayStylePeriod={todayStylePeriod}
      setTodayStylePeriod={setTodayStylePeriod}
      onChange={onChange}
      resetShopPriority={resetShopPriority}
      onShopReset={onShopReset}
      onPostReset={onPostReset}
      updateLoading={updateLoading}
      updateError={updateError}
      resetLoading={resetLoading}
      resetError={resetError}
      onSubmit={onSubmit}
    />
  );
};
