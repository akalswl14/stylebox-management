import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { ProductListContext } from "./ProductListContainer";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import SearchButton from "../../Components/SearchButton";
import ProductListTable from "./ProductListTable";

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
  const { productDispatch, productState } = useContext(ProductListContext);

  const onChangeCurrentPage = (pageNum) => {
    productDispatch({
      type: "UPDATE_PAGENUM",
      data: { pageNum },
    });
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

  const SearchProductList = (e) => {
    e.preventDefault();
    productDispatch({
      type: "UPDATE_SEARCHOPTION",
      data: {
        searchOption: {
          ...productState.searchOption,
          searchItemBoolean:
            productState.searchOption.searchKeyWord !== "" ? true : false,
          searchItem: productState.searchOption.searchKeyWord,
        },
      },
    });
  };
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
    }, [data]);
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
              <Link to="/">
                <Button text="Add New Product"></Button>
              </Link>
              <Button text="Download List"></Button>
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
              currentPage={productState.pageNum}
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
