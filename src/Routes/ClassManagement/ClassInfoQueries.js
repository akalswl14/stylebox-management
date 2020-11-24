import { gql } from "apollo-boost";

export const GET_CLASS = gql`
  query GET_CLASS($id: Int!) {
    getClassInfo(id: $id) {
      classId
      className
      category
      postNum
      shopNum
      productNum
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CLASS = gql`
  mutation UPDATE_CLASS(
    $classId: Int!
    $className: String
    $classCategory: Category
  ) {
    updateClassInfo(
      classId: $classId
      className: $className
      classCategory: $classCategory
    )
  }
`;

export const CHECK_CLASSNAME = gql`
  query CHECK_CLASSNAME($className: String!) {
    getClassDuplication(className: $className)
  }
`;
