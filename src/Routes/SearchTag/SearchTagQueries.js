import { gql } from 'apollo-boost';

export const SETTING_POPULAR_TAGS = gql`
  query SETTING_POPULAR_TAGS {
    getSettingPopularTags {
      order
      id
      tagName
      Category
      className
      classId
    }
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
