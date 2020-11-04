import { gql } from "apollo-boost";

export const CREATE_SHOP = gql`
  mutation CreateShop(
    $shopName: String!
    $logoUrl: String
    $phoneNumber: String!
    $mainBranchAddress: String!
    $mainBranchMapUrl: String!
    $weight: Int!
    $tags: [IdOrderInputType!]
    $FacebookLink: String
    $InstagramLink: String
    $YoutubeLink: String
    $externalLinks: [LinkInputType!]
    $shopImages: [ImageInputType!]
    $shopVideos: [ImageInputType!]
    $description: String
    $branches: [branchInputType!]
  ) {
    createShop(
      mainBranchAddress: $mainBranchAddress
      mainBranchMapUrl: $mainBranchMapUrl
      phoneNumber: $phoneNumber
      shopName: $shopName
      weight: $weight
      branches: $branches
      description: $description
      externalLinks: $externalLinks
      FacebookLink: $FacebookLink
      InstagramLink: $InstagramLink
      logoUrl: $logoUrl
      shopImages: $shopImages
      shopVideos: $shopVideos
      tags: $tags
      YoutubeLink: $YoutubeLink
    )
  }
`;

export const CATEGORY_OPTION = gql`
  query GetCategoryQuery {
    getManageCategoryOptions
  }
`;

export const GET_CLASS = gql`
  query GET_CLASS($category: Category!) {
    getClassOptions(category: $category) {
      id
      name
    }
  }
`;

export const GET_TAG = gql`
  query GET_TAG($classId: Int!) {
    getTagOptions(classId: $classId) {
      id
      name
    }
  }
`;

export const GET_LINKTYPE = gql`
  query GET_LINKTYPE {
    getLinkTypeOption
  }
`;
