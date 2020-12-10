import { gql } from "apollo-boost";

export const GET_PRODUCT_TAG = gql`
  mutation GET_PRODUCT_TAG($lang: String, $productIds: [Int]!) {
    getSubProductTag(lang: $lang, productIds: $productIds) {
      tagId
      tagName
      classId
      className
      category
      order
    }
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

export const GET_SUBPRODUCT = gql`
  query GET_SUBPRODUCT($productName: String!, $shopId: Int) {
    getProductByName(productName: $productName, shopId: $shopId) {
      productId
      productName
      price
      link
    }
  }
`;

export const GET_BASICINFO = gql`
  query GET_BASICINFO($productName: String!) {
    getShopByProductName(productName: $productName) {
      productId
      productName
      shopId
      shopName
      price
    }
  }
`;

export const CREATE_POST = gql`
  mutation CREATE_POST(
    $mainProductId: Int
    $priority: Int
    $description: String
    $tags: [IdOrderInputType!]!
    $externalLinks: [LinkInputType!]!
    $images: [ImageInputType!]!
    $videos: [VideoInputType!]!
    $subProducts: [idDicInputType!]!
  ) {
    createPostManage(
      mainProductId: $mainProductId
      priority: $priority
      description: $description
      tags: $tags
      externalLinks: $externalLinks
      images: $images
      videos: $videos
      subProducts: $subProducts
    ) {
      postId
    }
  }
`;
