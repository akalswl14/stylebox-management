import { gql } from "apollo-boost";

export const GET_PRODUCTLIST = gql`
  query GET_PRODUCTLIST(
    $pageNum: Int
    $productId: Int
    $productName: String
    $shopName: String
    $productIdAsc: Boolean
    $productNameAsc: Boolean
    $priceAsc: Boolean
  ) {
    getProductList(
      pageNum: $pageNum
      productId: $productId
      productName: $productName
      shopName: $shopName
      productIdAsc: $productIdAsc
      productNameAsc: $productNameAsc
      priceAsc: $priceAsc
    ) {
      products {
        productId
        productName
        price
        postNum
        link
      }
      totalProductNum
    }
  }
`;

export const DELETE_PRODUCTS = gql`
  mutation DELETE_PRODUCTS($productIds: [Int!]!) {
    deleteProductList(productIds: $productIds)
  }
`;

export const UPDATE_PRODUCTS = gql`
  mutation UPDATE_PRODUCTS($products: [ProductListInputType!]!) {
    updateProductList(products: $products)
  }
`;
