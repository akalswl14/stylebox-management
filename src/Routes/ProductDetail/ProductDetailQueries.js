import { gql } from "apollo-boost";

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $productId: Int!
    $productName: String
    $price: Int
    $isProductImageChange: Boolean!
    $productImage: String
    $isDescriptionChange: Boolean!
    $description: String
    $externalLink: String
    $tags: [Int!]
    $branchIds: [Int!]
  ) {
    updateProduct(
      productId: $productId
      productName: $productName
      price: $price
      isProductImageChange: $isProductImageChange
      productImage: $productImage
      isDescriptionChange: $isDescriptionChange
      description: $description
      externalLink: $externalLink
      tags: $tags
      branchIds: $branchIds
    )
  }
`;

export const GET_PRODUCT = gql`
  query ProductInformationQuery($productId: Int!) {
    getProductBasicInfo(id: $productId) {
      productId
      productName
      price
      productImage
      externalLink
    }
    getProductBasicStatus(id: $productId) {
      postNum
      createdAt
      updatedAt
    }
    getProductTagInfo(id: $productId) {
      tagId
      tagName
      classId
      className
      category
      order
    }
    getProductDescription(id: $productId)
    getProductSellingShopBranch(productId: $productId) {
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
    getShopOption(shopName: "") {
      id
      shopName
      shopLink
    }
    getManageCategoryOptions
  }
`;

export const GET_BRANCHES = gql`
  query GET_BRANCHES($shopId: Int, $productId: Int) {
    getProductSellingShopBranch(shopId: $shopId, productId: $productId) {
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
