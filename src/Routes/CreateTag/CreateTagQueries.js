import { gql } from "apollo-boost";

export const CREATE_TAG = gql`
  mutation CREATE_TAG(
    $tagName: String!
    $tagCategory: Category!
    $tagImage: String
    $classId: Int!
  ) {
    createTagInfo(
      tagName: $tagName
      tagCategory: $tagCategory
      tagImage: $tagImage
      classId: $classId
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
