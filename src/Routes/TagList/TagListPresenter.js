import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { TagListContext } from "./TagListContainer";
import TagListTable from "./TagListTable";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import { GET_TAGLIST } from "./TagListQueries";
import { useQuery } from "react-apollo-hooks";

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

const InputButtonBox = styled.input`
  width: 40px;
  height: 100%;
  text-align: center;
`;

const PaginationBox = styled.div`
  width: 100%;
  text-align: center;
`;

export default ({ loading, data, error }) => {
  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    const { tagDispatch, tagstate } = useContext(TagListContext);

    useEffect(() => {
      let TagListData = data.getTagList.map((eachData) => {
        let tagData = {
          tagId: eachData.tagId,
          tagName: eachData.tagName,
          category: eachData.category,
          className: eachData.className,
          postNum: eachData.postNum,
          shopNum: eachData.shopNum,
          productNum: eachData.productNum,
        };
        return tagData;
      });

      const TagSearchItem = { searchItem: "" };
      const TagSearchKind = { search: "" };

      tagDispatch({
        type: "SET_DATA",
        data: {
          TagListData,
          TagSearchItem,
          TagSearchKind,
        },
      });
    }, []);

    const [pageState, setPageState] = useState({
      currentPage: 1,
    });

    const onChangeCurrentPage = (numPage) => {
      setPageState({
        currentPage: numPage,
      });
    };

    const onInputChange = (e) => {
      const { name, value } = e.target;
      tagDispatch({
        type: "CHANGE_SEARCH",
        name,
        value,
      });
    };

    const onSelectChange = (e) => {
      const { name, value } = e.target;
      tagDispatch({
        type: "CHANGE_SEARCH_KIND",
        name,
        value,
      });
    };

    const onSearchSubmit = async (e) => {
      e.preventDefault();
      // const kind = tagstate.TagSearchKind.search;

      // if (kind === "tagName") {
      //   const { data: tagNameData } = useQuery(GET_TAGLIST, {
      //     variables: { tagName: tagstate.TagSearchItem.searchItem },
      //   });
      // }
    };
    return (
      <>
        <WrapPage>
          <PageTitle text={"Tag List"} />
          <TitleBox>
            <form onSubmit={onSearchSubmit}>
              <SearchBox>
                <SelectBox name="search" onChange={onSelectChange}>
                  <option value="tagId">tagId</option>
                  <option value="tagName">tagName</option>
                  <option value="category">category</option>
                  <option value="className">className</option>
                </SelectBox>
                &nbsp;
                <InputBox
                  type="text"
                  name="searchItem"
                  onChange={onInputChange}
                />{" "}
                &nbsp;
                <InputButtonBox type="submit" value="&#128270;" />
              </SearchBox>
            </form>
            <ButtonBox>
              <Link to="/">
                <Button text="See Tag Map"></Button>
              </Link>
              <Link to="/">
                <Button text="Add New Class"></Button>
              </Link>
              <Link to="/">
                <Button text="Add New Tag"></Button>
              </Link>
              <Button text="Download List"></Button>
            </ButtonBox>
          </TitleBox>
          <form>
            <TagListTable />
            <SearchBox>
              <Button type="submit" text="Delete Selected"></Button>
            </SearchBox>
          </form>
          <PaginationBox>
            <Pagination
              currentPage={pageState.currentPage}
              totalSize={100}
              sizePerPage={10}
              changeCurrentPage={onChangeCurrentPage}
              theme="bootstrap"
            />
          </PaginationBox>
        </WrapPage>
      </>
    );
  }
};
