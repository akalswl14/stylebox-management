import React, { useContext } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { TagListContext } from "./TagListContainer";
import TagListTable from "./TagListTable";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import SearchButton from "../../Components/SearchButton";
import PageChangeButton from "../../Components/PageChangeButton";
import Button from "../../Components/Button";

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
  const { tagDispatch, tagState } = useContext(TagListContext);

  const onChangeCurrentPage = (pageNum) => {
    tagDispatch({
      type: "UPDATE_PAGENUM",
      data: { pageNum },
    });
  };

  const ChangeSearch = (e) => {
    const { value, name } = e.target;
    tagDispatch({
      type: "UPDATE_SEARCH",
      data: {
        name,
        value,
      },
    });
  };

  const SearchTagList = (e) => {
    e.preventDefault();
    tagDispatch({
      type: "UPDATE_SEARCHOPTION",
      data: {
        searchOption: {
          ...tagState.searchOption,
          searchItemBoolean:
            tagState.searchOption.searchKeyWord !== "" ? true : false,
          searchItem: tagState.searchOption.searchKeyWord,
        },
      },
    });
  };

  const ExportToExcel = (e) => {
    e.preventDefault();
  };

  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    return (
      <>
        <WrapPage>
          <PageTitle text={"Tag List"} />
          <TitleBox>
            <form>
              <SearchBox>
                <SelectBox
                  name="searchSelectBox"
                  onChange={ChangeSearch}
                  defaultValue={tagState.searchOption.searchSelectBox}
                >
                  <option value="tagId">tagId</option>
                  <option value="tagName">tagName</option>
                  <option value="category">category</option>
                  <option value="className">className</option>
                </SelectBox>
                &nbsp;
                <InputBox
                  type="text"
                  name="searchKeyWord"
                  value={tagState.searchOption.searchKeyWord}
                  onChange={ChangeSearch}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      SearchTagList(e);
                    }
                  }}
                />
                &nbsp;
                <SearchButton ClickEvent={SearchTagList} />
              </SearchBox>
            </form>
            <ButtonBox>
              <PageChangeButton text="See Tag Map" href="/tagmap" />
              <PageChangeButton text="Add New Class" href="/createclass" />
              <PageChangeButton text="Add New Tag" href="/createtag" />
              <Button text="Download List" ClickEvent={ExportToExcel}></Button>
            </ButtonBox>
          </TitleBox>
          <form onSubmit={onSubmit}>
            <TagListTable data={data} />
            <SearchBox>
              <Button type="submit" text="Delete Selected"></Button>
            </SearchBox>
          </form>
          <PaginationBox>
            <Pagination
              currentPage={tagState.pageNum}
              totalSize={data.getTagList.totalTagNum} //api 에서 전체 수 전달해주기
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
