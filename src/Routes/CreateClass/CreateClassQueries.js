import { gql } from "apollo-boost";

export const CREATE_CLASS = gql`
  mutation CREATE_CLASS($className: String!, $category: Category!) {
    createClassInfo(className: $className, category: $category)
  }
`;
