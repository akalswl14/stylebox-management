import React, { useContext } from "react";
import styled from "styled-components";
import { ProductListContext } from "./ProductListContainer";
import Button from "../../Components/Button";
import SortButton from "../../Components/SortButton";
import { Link } from "react-router-dom";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  input {
    text-align: center;
  }
  th:first-child {
    width: 13%;
    padding: 12px;
    border-right: 1px solid #858585;
    background-color: #f2f2f2;
  }
  th {
    padding: 12px;
    border: 1px solid #858585;
    background-color: #f2f2f2;
  }
  tr {
    border: 1px solid #858585;
  }
  td {
    padding: 3px;
  }
  td:first-child {
    border: 1px solid #858585;
  }
`;

const SortText = styled.span`
  line-height: 30px;
`;

const ProductListTable = ({ data }) => {
  const { productState, productDispatch } = useContext(ProductListContext);

  const CheckAllCheckBox = (e) => {
    let saveList = productState.selectedProductIdList.slice();
    if (e.target.checked) {
      for (const eachProduct of data.getProductList.products) {
        if (!saveList.includes(eachProduct.productId)) {
          saveList.push(eachProduct.productId);
        }
      }
    } else {
      for (const eachProduct of data.getProductList.products) {
        const idx = saveList.indexOf(eachProduct.productId);
        if (idx > -1) {
          saveList.splice(idx, 1);
        }
      }
    }
    productDispatch({
      type: "UPDATE_BATCH_SELECTPRODCT",
      data: { saveList },
    });
  };

  const onCheckBoxChange = (productId) => {
    productDispatch({
      type: "UPDATE_SELECTPRODCT",
      data: { productId },
    });
  };

  const AllCheckBoxStatus = () => {
    for (const eachProduct of data.getProductList.products) {
      if (!productState.selectedProductIdList.includes(eachProduct.productId)) {
        return false;
      }
    }
    return true;
  };

  const PriceChange = (e, productId) => {
    const { value } = e.target;
    if (productState.selectedProductIdList.includes(productId)) {
      productDispatch({
        type: "UPDATE_PRODUCT_PRICE",
        data: {
          value,
          productId,
        },
      });
    }
  };

  const SortClick = (e, name) => {
    e.preventDefault();
    let sortOption = {
      sortProductId: false,
      sortProductName: false,
      sortPrice: false,
      productIdAsc: true,
      productNameAsc: true,
      priceAsc: true,
    };
    if (name === "productId") {
      if (productState.sortOption.sortProductId) {
        if (productState.sortOption.productIdAsc) {
          sortOption.sortProductId = true;
          sortOption.productIdAsc = false;
        } else {
          sortOption.sortProductId = false;
          sortOption.productIdAsc = true;
        }
      } else {
        sortOption.sortProductId = true;
        sortOption.productIdAsc = true;
      }
    } else if (name === "productName") {
      if (productState.sortOption.sortProductName) {
        if (productState.sortOption.productNameAsc) {
          sortOption.sortProductName = true;
          sortOption.productNameAsc = false;
        } else {
          sortOption.sortProductName = false;
          sortOption.productNameAsc = true;
        }
      } else {
        sortOption.sortProductName = true;
        sortOption.productNameAsc = true;
      }
    } else if (name === "price") {
      if (productState.sortOption.sortPrice) {
        if (productState.sortOption.priceAsc) {
          sortOption.sortPrice = true;
          sortOption.priceAsc = false;
        } else {
          sortOption.sortPrice = false;
          sortOption.priceAsc = true;
        }
      } else {
        sortOption.sortPrice = true;
        sortOption.priceAsc = true;
      }
    }
    productDispatch({
      type: "UPDATE_SORTOPTION",
      data: {
        sortOption,
      },
    });
  };
  return (
    <Table>
      <th>
        <input
          type="checkbox"
          onChange={CheckAllCheckBox}
          checked={AllCheckBoxStatus()}
        />
      </th>
      <th>
        <SortText>Product Id</SortText>
        <SortButton
          type={
            !productState.sortOption.sortProductId
              ? 0
              : productState.sortOption.productIdAsc
              ? 1
              : 2
          }
          func={(e) => SortClick(e, "productId")}
        />
      </th>
      <th>
        <SortText>Product Name</SortText>
        <SortButton
          type={
            !productState.sortOption.sortProductName
              ? 0
              : productState.sortOption.productNameAsc
              ? 1
              : 2
          }
          func={(e) => SortClick(e, "productName")}
        />
      </th>
      <th>
        <SortText>Price</SortText>
        <SortButton
          type={
            !productState.sortOption.sortPrice
              ? 0
              : productState.sortOption.priceAsc
              ? 1
              : 2
          }
          func={(e) => SortClick(e, "price")}
        />
      </th>
      <th>Number of Posts</th>
      <th>Link</th>
      <th>Edit</th>
      {productState.productInfo.map((product) => (
        <tr>
          <td>
            <input
              type="checkbox"
              name="productId"
              onChange={() => onCheckBoxChange(product.productId)}
              checked={
                productState.selectedProductIdList.includes(product.productId)
                  ? true
                  : false
              }
            />
          </td>
          <td>{product.productId}</td>
          <td>{product.productName}</td>
          <td>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={(e) => PriceChange(e, product.productId)}
            />
          </td>
          <td>{product.postNum}</td>
          <td>{product.link}</td>
          <td>
            <Link to="/">
              <Button text="Edit"></Button>
            </Link>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default ProductListTable;
