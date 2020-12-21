import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { PostListContext } from "./PostListContainer";
import Button from "../../Components/Button";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import SearchButton from "../../Components/SearchButton";
import PostListTable from "./PostListTable";
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
      let postInfo = data.getPostList.posts.map((eachData) => {
        let postData = {
          postId: eachData.postId,
          mainProductName: eachData.mainProductName,
          price: eachData.price,
          shopName: eachData.shopName,
          priority: eachData.priority,
          likesNum: eachData.likesNum,
          subProductsNum: eachData.subProductsNum,
          viewsNum: eachData.viewsNum,
          linksClickNum: eachData.linksClickNum,
          linksNum: eachData.linksNum,
          rank: eachData.rank,
        };
        return postData;
      });
      postDispatch({
        type: "SET_DATA",
        data: {
          postInfo,
        },
      });
    }, []);

    const { postDispatch, postState } = useContext(PostListContext);

    const queryInput = queryString.parse(window.location.search);

    const onChangeCurrentPage = (pageNum) => {
      const changedQuery = queryString.stringify({
        ...queryInput,
        page: pageNum,
      });
      window.location.href = `/postlist?${changedQuery}`;
    };

    const ChangeSearch = (e) => {
      const { value, name } = e.target;
      postDispatch({
        type: "UPDATE_SEARCH",
        data: {
          name,
          value,
        },
      });
    };

    const ChangeButton = (buttonKind) => {
      postDispatch({
        type: "CHANGE_BUTTON",
        data: {
          buttonKind,
        },
      });
    };

    const SearchPostList = (e) => {
      e.preventDefault();
      if (postState.searchOption.searchSelectBox === "postId") {
        if (isNaN(postState.searchOption.searchKeyWord)) {
          toast.error("Id must be a number.");
          return;
        }
      }
      const changedQuery = {
        page: 1,
        key_postid:
          postState.searchOption.searchSelectBox === "postId"
            ? postState.searchOption.searchKeyWord
            : undefined,
        key_productname:
          postState.searchOption.searchSelectBox === "mainProductName"
            ? postState.searchOption.searchKeyWord
            : undefined,
        key_shopname:
          postState.searchOption.searchSelectBox === "shopName"
            ? postState.searchOption.searchKeyWord
            : undefined,
      };
      window.location.href = `/postlist?${queryString.stringify(changedQuery)}`;
    };

    const ExportToExcel = (e) => {
      e.preventDefault();
    };

    const refreshQuery = (e) => {
      e.preventDefault();
      window.location.href = "/postlist";
    };
    return (
      <>
        <WrapPage>
          <PageTitle text={"Post List"} />
          <TitleBox>
            <form>
              <SearchBox>
                <SelectBox
                  name="searchSelectBox"
                  onChange={ChangeSearch}
                  defaultValue={postState.searchOption.searchSelectBox}
                >
                  <option value="postId">postId</option>
                  <option value="mainProductName">mainProductName</option>
                  <option value="shopName">shopName</option>
                </SelectBox>
                &nbsp;
                <InputBox
                  type="text"
                  name="searchKeyWord"
                  value={postState.searchOption.searchKeyWord}
                  onChange={ChangeSearch}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      SearchPostList(e);
                    }
                  }}
                />
                &nbsp;
                <SearchButton ClickEvent={SearchPostList} />
              </SearchBox>
            </form>
            <ButtonBox>
              <RefreshButton func={refreshQuery} />
              <PageChangeButton text="Add New Post" href="/createpost" />
              <Button text="Download List" ClickEvent={ExportToExcel}></Button>
            </ButtonBox>
          </TitleBox>
          <form onSubmit={onSubmit}>
            <PostListTable data={data} />
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
              totalSize={data.getPostList.totalPostNum}
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
