import { gql } from "apollo-boost";

export const GET_SHOP = gql`
  query ShopInformationQuery($shopId: Int!) {
    __typename
    getShopBasicInfo(id: $shopId) {
      id
      logoUrl
      mainBranchAddress
      mainBranchMapUrl
      phoneNumber
      shopName
    }
    getShopBasicStatus(id: $shopId) {
      RegistrationDate
      UpdateDate
      likeNum
      monthlyRankNum
      postNum
      productNum
      viewNum
      weight
    }
    getShopTagInfo(id: $shopId) {
      category
      classId
      className
      order
      tagId
      tagName
    }
    getShopSNSLink(id: $shopId) {
      FacebookLink
      InstagramLink
      YoutubeLink
    }
    getShopExternalLink(id: $shopId) {
      isShown
      linkType
      order
      url
    }
    getShopImages(id: $shopId) {
      order
      url
    }
    getShopVideos(id: $shopId) {
      order
      url
    }
    getShopDescription(id: $shopId)
    getShopToBranch(id: $shopId) {
      address
      branchName
      googleMapUrl
      id
      phoneNumber
    }
    getManageCategoryOptions
    getLinkTypeOption
  }
`;

export const UPDATE_SHOP = gql`
  mutation UpdateShop(
    $shopId: Int!
    $shopName: String
    $isLogoUrlChange: Boolean!
    $logoUrl: String
    $phoneNumber: String
    $weight: Int
    $isDescriptionChange: Boolean!
    $description: String
    $tags: [IdOrderInputType!]
    $externalLinks: [LinkInputType!]
    $isFacebookLinkChange: Boolean!
    $FacebookLink: String
    $isInstagramLinkChange: Boolean!
    $InstagramLink: String
    $isYoutubeLinkChange: Boolean!
    $YoutubeLink: String
    $shopImages: [ImageInputType!]
    $shopVideos: [ImageInputType!]
    $branches: [branchUpdateInputType!]
    $mainBranchAddress: String
    $mainBranchMapUrl: String
  ) {
    updateShop(
      shopId: $shopId
      shopName: $shopName
      isLogoUrlChange: $isLogoUrlChange
      logoUrl: $logoUrl
      phoneNumber: $phoneNumber
      weight: $weight
      isDescriptionChange: $isDescriptionChange
      description: $description
      tags: $tags
      externalLinks: $externalLinks
      isFacebookLinkChange: $isFacebookLinkChange
      FacebookLink: $FacebookLink
      isInstagramLinkChange: $isInstagramLinkChange
      InstagramLink: $InstagramLink
      isYoutubeLinkChange: $isYoutubeLinkChange
      YoutubeLink: $YoutubeLink
      shopImages: $shopImages
      shopVideos: $shopVideos
      branches: $branches
      mainBranchAddress: $mainBranchAddress
      mainBranchMapUrl: $mainBranchMapUrl
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

export const CHECK_SHOPNAME = gql`
  mutation CheckShopName($shopName: String!) {
    getShopNameExists(shopName: $shopName)
  }
`;
