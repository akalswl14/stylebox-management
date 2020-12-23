import { gql } from "apollo-boost";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $productName: String!
    $price: Int!
    $productImage: String
    $description: String
    $externalLink: String!
    $tags: [IdOrderInputType!]
    $branchIds: [Int!]
  ) {
    createProduct(
      productName: $productName
      price: $price
      productImage: $productImage
      description: $description
      externalLink: $externalLink
      tags: $tags
      branchIds: $branchIds
    ) {
      productId
    }
  }
`;

export const GET_PRODUCTINFO = gql`
  query ProductInformationQuery {
    getShopOption(shopName: "") {
      id
      shopName
      shopLink
    }
    getManageCategoryOptions
  }
`;

export const GET_BRANCHES = gql`
  query GET_BRANCHES($shopId: Int!) {
    getProductSellingShopBranch(shopId: $shopId) {
      id
      shopName
      shopLink
      branches {
        id
        branchName
        phoneNumber
        address
        isSelected
      }
    }
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

export const GET_TAGS_BYSHOP = gql`
  mutation getTagsbyShop($shopId: Int!, $tags: [Int!]!) {
    getTagsbyShop(shopId: $shopId, tags: $tags) {
      tagId
      tagName
      classId
      className
      category
      order
    }
  }
`;
