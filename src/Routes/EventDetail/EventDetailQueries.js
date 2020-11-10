import { gql } from "apollo-boost";

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $eventId: Int!
    $title: String
    $startDate: DateTime
    $endDate: DateTime
    $url: String
    $bannerImage: String
    $isOnList: Boolean
    $images: [ImageInputType!]
    $contentsImages: [ImageInputType!]
    $videos: [ImageInputType!]
    $tags: [IdOrderInputType!]
  ) {
    updateEvent(
      eventId: $eventId
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
    )
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

export const GET_EVENT = gql`
  query EventInformationQuery($eventId: Int!) {
    getEventBasicInfo(id: $eventId) {
      id
      isOnList
      title
      startDate
      endDate
      url
    }
    getEventBasicStatus(id: $eventId) {
      likesNum
      viewsNum
      createdAt
      updatedAt
    }
    getEventTagInfo(id: $eventId) {
      tagId
      tagName
      classId
      className
      category
      order
    }
    getEventThumbnailImage(id: $eventId)
    getEventMainImages(id: $eventId) {
      order
      url
    }
    getEventMainVideos(id: $eventId) {
      order
      url
    }
    getEventDetailImages(id: $eventId) {
      order
      url
    }
    getManageCategoryOptions
  }
`;
