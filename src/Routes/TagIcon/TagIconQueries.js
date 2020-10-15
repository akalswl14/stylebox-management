import { gql } from "apollo-boost";

export const DASHBOARD_QUERY = gql`
  query dashboardInfo {
    getDashboardBasicStatus {
      AvgEventLikeNum
      AvgEventViewNum
      AvgPostLikeNum
      AvgPostViewNum
      AvgShopLikeNum
      AvgShopViewNum
      PostNum
      ProductNum
      ShopNum
      TotalEventLikeNum
      TotalPostLikeNum
      TotalEventViewNum
      TotalPostViewNum
      TotalShopLikeNum
      TotalShopViewNum
      UserNum
    }
    getTopShops {
      No
      address
      likeNum
      phoneNumber
      postNum
      productNum
      rankNum
      shopId
      shopName
      tagNames
      viewNum
      weight
    }
    # getTopPosts(periodFilter: 1) {
    #   No
    #   likeNum
    #   mainProductName
    #   postId
    #   price
    #   priority
    #   rankNum
    #   shopId
    #   subProductNum
    #   tagNames
    #   viewNum
    # }
  }
`;

export const DASHBOARD_TOPPOST_QUERY = gql`
  query dashboardTopPost($periodFilter: Int) {
    getTopPosts(periodFilter: $periodFilter) {
      No
      likeNum
      mainProductName
      postId
      price
      priority
      rankNum
      shopId
      subProductNum
      tagNames
      viewNum
    }
  }
`;
