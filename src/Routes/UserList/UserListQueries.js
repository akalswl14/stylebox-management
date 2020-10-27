import { gql } from "apollo-boost";

export const GET_USERS = gql`
  query getUserList(
    $pageNum: Int
    $userId: Int
    $userIdAsc: Boolean
    $installationDateAsc: Boolean
  ) {
    getUserList(
      pageNum: $pageNum
      userId: $userId
      userIdAsc: $userIdAsc
      installationDateAsc: $installationDateAsc
    ) {
      totalUserNum
      users {
        userId
        installationDate
        PostLikeNum
        ShopLikeNum
        EventLikeNum
      }
    }
  }
`;

export const DELETE_USERS = gql`
  mutation DeleteUsers($userIds: [Int!]) {
    deleteUsers(userIds: $userIds)
  }
`;
