// import { gql } from "apollo-boost";

// export const GET_SHOPS = gql`
//   query getShopList(
//     $address: String
//     $pageNum: Int
//     $phoneNumber: String
//     $shopId: Int
//     $shopIdAsc: Boolean
//     $shopName: String
//     $shopNameAsc: Boolean
//     $tagName: String
//     $weightAsc: Boolean
//     $rankAsc: Boolean
//   ) {
//     getShopList(
//       address: $address
//       pageNum: $pageNum
//       phoneNumber: $phoneNumber
//       shopId: $shopId
//       shopIdAsc: $shopIdAsc
//       shopName: $shopName
//       shopNameAsc: $shopNameAsc
//       tagName: $tagName
//       weightAsc: $weightAsc
//       rankAsc: $rankAsc
//     ) {
//       totalShopNum
//       shops {
//         No
//         address
//         likeNum
//         phoneNumber
//         postNum
//         productNum
//         rankNum
//         shopId
//         shopName
//         tagNames
//         viewNum
//         weight
//       }
//     }
//   }
// `;

// export const DELETE_SHOPS = gql`
//   mutation DeleteShops($shopIds: [Int!]!) {
//     deleteShops(shopIds: $shopIds)
//   }
// `;

// export const UPDATE_SHOPS = gql`
//   mutation UpdateShops($shops: [IdValueInputType!]) {
//     updateShops(shops: $shops)
//   }
// `;
