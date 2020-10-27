import { gql } from "apollo-boost";

export const GET_TAGLIST = gql`
  query GET_TAGLIST(
    $pageNum: Int
    $tagId: Int
    $tagName: String
    $category: Category
    $className: String
    $tagIdAsc: Boolean
    $tagNameAsc: Boolean
    $categoryAsc: Boolean
  ) {
    getTagList(
      pageNum: $pageNum
      tagId: $tagId
      tagName: $tagName
      category: $category
      className: $className
      tagIdAsc: $tagIdAsc
      tagNameAsc: $tagNameAsc
      categoryAsc: $categoryAsc
    ) {
      tagId
      tagName
      category
      className
      postNum
      shopNum
      productNum
    }
  }
`;
