import { gql } from "apollo-boost";

export const TAGICON_SETTING = gql`
  query TagIconQuery {
    getSettingMainBubbles {
      tagId
      tagName
      classId
      className
      category
      order
    }
    getSettingBestBubbles {
      tagId
      tagName
      classId
      className
      category
      order
    }
    getSettingShopBubbles {
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

export const UPDATE_TAGICON = gql`
  mutation updateTagIcon(
    $mainBubbleTags: [IdOrderInputType!]
    $bestBubbleTags: [IdOrderInputType!]
    $shopBubbleTags: [IdOrderInputType!]
  ) {
    updateSettingBubbles(
      mainBubbleTags: $mainBubbleTags
      bestBubbleTags: $bestBubbleTags
      shopBubbleTags: $shopBubbleTags
    )
  }
`;
