import { gql } from "apollo-boost";

export const GET_POST = gql`
  query GET_POST($id: Int!) {
    getPostBasicInfo(id: $id) {
      postId
      mainProductId
      mainProductName
      price
      shopId
      shopName
    }
    getPostBasicStatus(id: $id) {
      weeklyRank
      monthlyRank
      totalRank
      priority
      likesNum
      viewsNum
      createdAt
      updatedAt
    }
    getPostTagInfo(id: $id) {
      tagId
      tagName
      classId
      className
      category
      order
    }
    getPostExternalLink(id: $id) {
      id
      url
      order
      linkType
      postId
      Post
      isShown
      createdAt
      updatedAt
    }
    getPostImages(id: $id) {
      order
      url
    }
    getPostVideo(id: $id) {
      order
      url
    }
    getPostDescription(id: $id)
    getPostSubProduct(id: $id) {
      productId
      productName
      price
      link
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
