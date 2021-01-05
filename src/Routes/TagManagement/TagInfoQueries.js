import { gql } from "apollo-boost";

export const GET_TAG = gql`
  query GET_TAG($id: Int!) {
    getTagInfo(id: $id) {
      tagId
      tagName
      category
      tagImage
      className
      classId
      isClass
      postNum
      shopNum
      productNum
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UPDATE_CLASS(
    $tagId: Int!
    $tagName: String
    $tagCategory: Category
    $tagImage: String
    $isTagImageChange: Boolean!
    $classId: Int
  ) {
    updateTagInfo(
      tagId: $tagId
      tagName: $tagName
      tagCategory: $tagCategory
      tagImage: $tagImage
      isTagImageChange: $isTagImageChange
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

export const CHECK_TAGNAME = gql`
  query CHECK_TAGNAME($tagName: String!) {
    getTagDuplication(tagName: $tagName)
  }
`;
