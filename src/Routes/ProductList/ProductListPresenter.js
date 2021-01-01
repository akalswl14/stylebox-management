import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { ProductListContext } from "./ProductListContainer";
import Button from "../../Components/Button";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import SearchButton from "../../Components/SearchButton";
import ProductListTable from "./ProductListTable";
import PageChangeButton from "../../Components/PageChangeButton";
import { toast } from "react-toastify";
import queryString from "query-string";
import RefreshButton from "../../Components/RefreshButton";

const Wrapper = styled.div`
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ButtonBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const SearchBox = styled.div`
  height: 63px;
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
`;

const SelectBox = styled.select`
  width: 100px;
  height: 100%;
  text-align: center;
`;

const InputBox = styled.input`
  width: 200px;
  height: 100%;
  text-align: center;
`;

const PaginationBox = styled.div`
  width: 100%;
  text-align: center;
`;

export default ({ loading, data, error, onSubmit }) => {
  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    useEffect(() => {
      let productInfo = data.getProductList.products.map((eachData) => {
        let productData = {
          productId: eachData.productId,
          productName: eachData.productName,
          price: eachData.price,
          postNum: eachData.postNum,
          link: eachData.link,
        };
        return productData;
      });
      productDispatch({
        type: "SET_DATA",
        data: {
          productInfo,
        },
      });
    }, []);

    const { productDispatch, productState } = useContext(ProductListContext);
    const queryInput = queryString.parse(window.location.search);

    const onChangeCurrentPage = (pageNum) => {
      const changedQuery = queryString.stringify({
        ...queryInput,
        page: pageNum,
      });
      window.location.href = `/productlist?${changedQuery}`;
    };

    const ChangeSearch = (e) => {
      const { value, name } = e.target;
      productDispatch({
        type: "UPDATE_SEARCH",
        data: {
          name,
          value,
        },
      });
    };

    const ChangeButton = (buttonKind) => {
      productDispatch({
        type: "CHANGE_BUTTON",
        data: {
          buttonKind,
        },
      });
    };

    const ExportToExcel = (e) => {
      e.preventDefault();
    };

    const SearchProductList = (e) => {
      e.preventDefault();
      if (productState.searchOption.searchSelectBox === "productId") {
        if (isNaN(productState.searchOption.searchKeyWord)) {
          toast.error("Id must be a number.");
          return;
        }
      }

      const changedQuery = {
        page: 1,
        id:
          productState.searchOption.searchSelectBox === "productId"
            ? productState.searchOption.searchKeyWord
            : undefined,
        productname:
          productState.searchOption.searchSelectBox === "productName"
            ? productState.searchOption.searchKeyWord
            : undefined,
        shopname:
          productState.searchOption.searchSelectBox === "shopName"
            ? productState.searchOption.searchKeyWord
            : undefined,
      };

      window.location.href = `/productlist?${queryString.stringify(
        changedQuery
      )}`;
    };

    const refreshQuery = (e) => {
      e.preventDefault();
      window.location.href = "/productlist";
    };
    return (
      <>
        <WrapPage>
          <PageTitle text={"Product List"} />
          <TitleBox>
            <form>
              <SearchBox>
                <SelectBox
                  name="searchSelectBox"
                  onChange={ChangeSearch}
                  defaultValue={productState.searchOption.searchSelectBox}
                >
                  <option value="productId">productId</option>
                  <option value="productName">productName</option>
                  <option value="shopName">shopName</option>
                </SelectBox>
                &nbsp;
                <InputBox
                  type="text"
                  name="searchKeyWord"
                  value={productState.searchOption.searchKeyWord}
                  onChange={ChangeSearch}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      SearchProductList(e);
                    }
                  }}
                />
                &nbsp;
                <SearchButton ClickEvent={SearchProductList} />
              </SearchBox>
            </form>
            <ButtonBox>
              <RefreshButton func={refreshQuery} />
              <PageChangeButton text="Add New Product" href="/createproduct" />
              <Button text="Download List" ClickEvent={ExportToExcel}></Button>
            </ButtonBox>
          </TitleBox>
          <form onSubmit={onSubmit}>
            <ProductListTable data={data} />
            <SearchBox>
              <div onClick={() => ChangeButton("edit")}>
                <Button type="submit" text="Edit Selected"></Button>
              </div>
              <div onClick={() => ChangeButton("delete")}>
                <Button type="submit" text="Delete Selected"></Button>
              </div>
            </SearchBox>
          </form>
          <PaginationBox>
            <Pagination
              currentPage={
                isNaN(Number(queryInput.page)) || Number(queryInput.page) <= 0
                  ? 1
                  : Number(queryInput.page)
              }
              totalSize={data.getProductList.totalProductNum}
              sizePerPage={13}
              changeCurrentPage={onChangeCurrentPage}
              numberOfPagesNextToActivePage={3}
              theme="bootstrap"
            />
          </PaginationBox>
        </WrapPage>
      </>
    );
  }
};
