import { gql } from "apollo-boost";

export const GET_POSTLIST = gql`
  query GET_POSTLIST(
    $pageNum: Int
    $postId: Int
    $mainProductName: String
    $shopName: String
    $postIdAsc: Boolean
    $mainProductNameAsc: Boolean
    $priceAsc: Boolean
    $shopNameAsc: Boolean
    $priorityAsc: Boolean
  ) {
    getPostList(
      pageNum: $pageNum
      postId: $postId
      mainProductName: $mainProductName
      shopName: $shopName
      postIdAsc: $postIdAsc
      mainProductNameAsc: $mainProductNameAsc
      priceAsc: $priceAsc
      shopNameAsc: $shopNameAsc
      priorityAsc: $priorityAsc
    ) {
      posts {
        postId
        mainProductName
        price
        shopName
        priority
        likesNum
        subProductsNum
        viewsNum
        linksClickNum
        linksNum
        rank
      }
      totalPostNum
    }
  }
`;

export const DELETE_POSTS = gql`
  mutation DELETE_POSTS($postIds: [Int!]!) {
    deletePostList(postIds: $postIds)
  }
`;

export const UPDATE_POSTS = gql`
  mutation UPDATE_POSTS($posts: [IdPriorityInputType!]!) {
    updatePostList(posts: $posts)
  }
`;
