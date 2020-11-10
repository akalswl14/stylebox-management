import { gql } from "apollo-boost";

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $url: String
    $bannerImage: String!
    $isOnList: Boolean!
    $images: [ImageInputType!]!
    $contentsImages: [ImageInputType!]!
    $videos: [ImageInputType!]!
    $tags: [IdOrderInputType!]
  ) {
    createEvent(
      title: $title
      startDate: $startDate
      endDate: $endDate
      url: $url
      bannerImage: $bannerImage
      isOnList: $isOnList
      images: $images
      contentsImages: $contentsImages
      videos: $videos
      tags: $tags
    ) {
      eventId
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
