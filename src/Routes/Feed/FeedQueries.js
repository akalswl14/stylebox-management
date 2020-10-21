import { gql } from "apollo-boost";

export const FEED_QUERY = gql`
    query feedInfo {
        getTodaysStylesPeriod {
            period
            postNum
        }
        getSearchPeriod
        getBestFeedNum
        getPostAlgorithm {
            bestConstA
            bestConstB
        }
        getShopAlgorithm {
            shopConstA
            shopConstB
            shopConstC
        }
    }
`;

export const FEED_MUTATION = gql`
    mutation updateFeedSetting (
        $TodaysStylesPeriod: DateTime
        $SearchPeriod: DateTime
        $BestRankNum: Int
        $shopConstA: Int
        $shopConstB: Int
        $shopConstC: Int
        $postConstA: Int
        $postConstB: Int
    ) {
        updateFeedSetting (
            TodaysStylesPeriod : $TodaysStylesPeriod,
            SearchPeriod : $SearchPeriod,
            BestRankNum : $BestRankNum,
            shopConstA : $shopConstA,
            shopConstB : $shopConstB,
            shopConstC : $shopConstC,
            postConstA : $postConstA,
            postConstB : $postConstB,
        )
    }
`;

export const RESET_MUTATION = gql`
    mutation resetShopPriority{
        resetShopPriority
    }
`;