import { gql } from "apollo-boost";

export const CREATE_CLASS = gql`
  mutation CREATE_CLASS($className: String!, $category: Category!) {
    createClassInfo(className: $className, category: $category)
  }
`;

export const CHECK_CLASSNAME = gql`
  query CHECK_CLASSNAME($className: String!) {
    getClassDuplication(className: $className)
  }
`;
