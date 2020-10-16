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

// export const CLASS_OPTION = gql`
//   query GetClassQuery($category: Category) {
//     getClassOptions(category: $category) {
//       id
//       name
//     }
//   }
// `;

export const TAG_INFO = gql`
  query GetTagQuery($classId: String) {
    getTagOptions(classId: $classId) {
      id
      name
    }
  }
`;

export const STYLE_CLASS_OPTION = gql`
  query GetClassQuery {
    getClassOptions(category: Style) {
      id
      name
    }
  }
`;
