import React, { useContext } from "react";
import styled from "styled-components";
import { ProductListContext } from "./ProductListContainer";
import SortButton from "../../Components/SortButton";
import PageChangeButton from "../../Components/PageChangeButton";
import queryString from "query-string";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  td,
  th {
    padding: 6px 2px;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    font-size: 13px;
    vertical-align: middle;
  }
  th:first-child,
  th:last-child {
    width: 5%;
  }
  th:nth-child(2),
  th:nth-child(4),
  th:nth-child(5),
  th:nth-child(6) {
    width: 8%;
  }
  th:nth-child(3) {
    width: 15%;
  }
  th:nth-child(7) {
    width: 30%;
  }
  td {
    font-size: 13px;
    vertical-align: middle;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

const SortText = styled.span`
  line-height: 30px;
`;

const ProductListTable = ({ data }) => {
  const { productState, productDispatch } = useContext(ProductListContext);

  const queryInput = queryString.parse(window.location.search);

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
    if (!productState.selectedProductIdList.includes(productId)) {
      productState.selectedProductIdList.push(productId);
    }
    productDispatch({
      type: "UPDATE_PRODUCT_PRICE",
      data: {
        value,
        productId,
      },
    });
  };

  const SortClick = (e, name) => {
    e.preventDefault();
    const changedQuery = {
      page: 1,
      id: queryInput.id ?? undefined,
      productname: queryInput.productname ?? undefined,
      shopname: queryInput.shopname ?? undefined,
    };

    if (name === "productId") {
      const sortid = queryInput.sortid;
      if (sortid) {
        if (Number(sortid) === 0) changedQuery.sortid = 1;
      } else {
        changedQuery.sortid = 0;
      }
    } else if (name === "productName") {
      const sortname = queryInput.sortname;
      if (sortname) {
        if (Number(sortname) === 0) changedQuery.sortname = 1;
      } else {
        changedQuery.sortname = 0;
      }
    } else if (name === "price") {
      const sortprice = queryInput.sortprice;
      if (sortprice) {
        if (Number(sortprice) === 0) changedQuery.sortprice = 1;
      } else {
        changedQuery.sortprice = 0;
      }
    }
    window.location.href = `/productlist?${queryString.stringify(
      changedQuery
    )}`;
  };
  return (
    <Table>
      <thead>
        <tr>
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
                !queryInput.sortid ? 0 : Number(queryInput.sortid) === 0 ? 1 : 2
              }
              func={(e) => SortClick(e, "productId")}
            />
          </th>
          <th>
            <SortText>Product Name</SortText>
            <SortButton
              type={
                !queryInput.sortname
                  ? 0
                  : Number(queryInput.sortname) === 0
                  ? 1
                  : 2
              }
              func={(e) => SortClick(e, "productName")}
            />
          </th>
          <th>Shop Name</th>
          <th>
            <SortText>Price</SortText>
            <SortButton
              type={
                !queryInput.sortprice
                  ? 0
                  : Number(queryInput.sortprice) === 0
                  ? 1
                  : 2
              }
              func={(e) => SortClick(e, "price")}
            />
          </th>
          <th>Number of Posts</th>
          <th>Link</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {productState.productInfo.map((product) => (
          <tr key={product.productId}>
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
            <td>{product.shopName}</td>
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
              <PageChangeButton
                width={50}
                text="edit"
                href={"/productdetail/" + product.productId}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductListTable;
