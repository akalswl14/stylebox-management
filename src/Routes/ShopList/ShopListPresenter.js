import React, { useContext } from "react";
import styled from "styled-components";
import PageTitle from "../../Components/PageTitle";
import WrapPage from "../../Styles/WrapPageStyles";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import { ShopListContext } from "./ShopListContainer";
import ShopDataRow from "./ShopDataRow";
import SortButton from "../../Components/SortButton";
import Pagination from "react-pagination-js";
import SearchButton from "../../Components/SearchButton";
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

const DeleteButtonBox = styled(ButtonBox)`
  justify-content: flex-start;
`;

const Form = styled.form``;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  td,
  th {
    padding: 8px 2px;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    font-size: 13px;
  }
  td {
    font-size: 12px;
  }
  .SortCell {
    justify-content: center;
    border: 0;
  }
  .tagNameCell {
    display: flex;
    justify-content: center;
    border: 0;
  }
  input.InUpdateList {
    border-color: #db3d45;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

const SortText = styled.span`
  line-height: 30px;
`;

const PaginationWrapper = styled.div`
  text-align: center;
  margin: 40px 0px;
`;

const SelectedShopContainer = styled.div`
  font-weight: 500;
  font-size: 17px;
`;

const SearchContainer = styled.div`
  padding-bottom: 20px;
  font-weight: 450;
  select,
  option,
  input {
    font-size: 14px;
    height: 30px;
  }
  input {
    margin-left: 10px;
  }
`;

export default ({ onSubmit, loading, error, data }) => {
  const { ShopListState, ShopListDispatch } = useContext(ShopListContext);

  const queryInput = queryString.parse(window.location.search);

  const SortClick = (e, name) => {
    e.preventDefault();

    const changedQuery = {
      page: 1,
      key_address: queryInput.key_address ?? undefined,
      key_phone: queryInput.key_phone ?? undefined,
      key_shopid: queryInput.key_shopid ?? undefined,
      key_shopname: queryInput.key_shopname ?? undefined,
      key_tag: queryInput.key_tag ?? undefined,
    };

    if (name === "ShopId") {
      const sort_shopid = queryInput.sort_shopid;
      if (sort_shopid) {
        if (Number(sort_shopid) === 0) {
          changedQuery.sort_shopid = 1;
        }
      } else {
        changedQuery.sort_shopid = 0;
      }
    } else if (name === "ShopName") {
      const sort_shopname = queryInput.sort_shopname;
      if (sort_shopname) {
        if (Number(sort_shopname) === 0) {
          changedQuery.sort_shopname = 1;
        }
      } else {
        changedQuery.sort_shopname = 0;
      }
    } else if (name === "Weight") {
      const sort_weight = queryInput.sort_weight;
      if (sort_weight) {
        if (Number(sort_weight) === 0) {
          changedQuery.sort_weight = 1;
        }
      } else {
        changedQuery.sort_weight = 0;
      }
    } else if (name === "Rank") {
      const sort_rank = queryInput.sort_rank;
      if (sort_rank) {
        if (Number(sort_rank) === 0) {
          changedQuery.sort_rank = 1;
        }
      } else {
        changedQuery.sort_rank = 0;
      }
    }

    window.location.href = `/shoplist?${queryString.stringify(changedQuery)}`;
  };

  const ChangeCurrentPage = (pageNum) => {
    const changedQuery = queryString.stringify({
      ...queryInput,
      page: pageNum,
    });
    window.location.href = `/shoplist?${changedQuery}`;
  };

  const ChangeSearchSelectBox = (e) => {
    const { value } = e.target;
    ShopListDispatch({
      type: "UPDATE_SEARCH_SELECTBOX",
      data: {
        SearchSelectBox: value,
      },
    });
  };

  const ChangeSearchKeyword = (e) => {
    const { value } = e.target;
    ShopListDispatch({
      type: "UPDATE_SEARCH_KEYWORD",
      data: {
        SearchKeyWord: value,
      },
    });
  };

  const SearchShopList = (e) => {
    e.preventDefault();
    if (ShopListState.SearchOption.SearchSelectBox === "ShopID") {
      if (isNaN(ShopListState.SearchOption.SearchKeyWord)) {
        toast.error("Id must be a number.");
        return;
      }
    }
    const changedQuery = {
      page: 1,
      key_shopid:
        ShopListState.SearchOption.SearchSelectBox === "ShopID"
          ? Number(ShopListState.SearchOption.SearchKeyWord)
          : undefined,
      key_shopname:
        ShopListState.SearchOption.SearchSelectBox === "ShopName"
          ? ShopListState.SearchOption.SearchKeyWord
          : undefined,
      key_phone:
        ShopListState.SearchOption.SearchSelectBox === "PhoneNumber"
          ? ShopListState.SearchOption.SearchKeyWord
          : undefined,
      key_address:
        ShopListState.SearchOption.SearchSelectBox === "Address"
          ? ShopListState.SearchOption.SearchKeyWord
          : undefined,
      key_tag:
        ShopListState.SearchOption.SearchSelectBox === "Tag"
          ? ShopListState.SearchOption.SearchKeyWord
          : undefined,
    };
    window.location.href = `/shoplist?${queryString.stringify(changedQuery)}`;
  };

  const refreshQuery = (e) => {
    e.preventDefault();
    window.location.href = "/shoplist";
  };

  if (error) return <WrapPage>`Error! ${error.message}`</WrapPage>;

  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  if (!loading && data) {
    if (!data.getShopList || !data.getShopList.shops) {
      toast.error("Error occured getting data.");
      return (
        <WrapPage>
          <TitleBox>
            <PageTitle text={"Shop List"} />
          </TitleBox>
          <Table>
            <thead>
              <tr>
                <th className="CheckBoxCell">
                  <input type="checkbox" />
                </th>
                <th>
                  <SortText>Shop ID</SortText>
                </th>
                <th>
                  <SortText>Shop Name</SortText>
                </th>
                <th>PhoneNumber</th>
                <th>Address</th>
                <th>Thumbnail Tags</th>
                <th>
                  <SortText>Rank</SortText>
                </th>
                <th>
                  <SortText>Weight</SortText>
                </th>
                <th>Posts</th>
                <th>Products</th>
                <th>Likes</th>
                <th>Views</th>
                <th>Edit</th>
              </tr>
            </thead>
          </Table>
        </WrapPage>
      );
    }
    const CheckAllCheckBox = (e) => {
      let BatchShopList = ShopListState.SelectedShopList;
      if (e.target.checked) {
        for (const eachShop of data.getShopList.shops) {
          if (!BatchShopList.includes(eachShop.shopId)) {
            BatchShopList.push(eachShop.shopId);
          }
        }
      } else {
        for (const eachShop of data.getShopList.shops) {
          const index = BatchShopList.indexOf(eachShop.shopId);
          if (index > -1) {
            BatchShopList.splice(index, 1);
          }
        }
      }
      ShopListDispatch({
        type: "UPDATE_BATCH_SELECTSHOP",
        data: { BatchShopList },
      });
    };

    const AllCheckBoxStatus = () => {
      for (const eachShop of data.getShopList.shops) {
        if (!ShopListState.SelectedShopList.includes(eachShop.shopId)) {
          return false;
        }
      }
      return true;
    };

    const ExportToExcel = (e) => {
      e.preventDefault();
      console.log("Export to Excel");
    };

    return (
      <WrapPage>
        <Form>
          <TitleBox>
            <PageTitle text={"Shop List"} />
            <ButtonBox>
              <RefreshButton func={refreshQuery} />
              <PageChangeButton text="Add New Shop" href="/createshop" />
              <Button
                text="Export to Excel"
                ClickEvent={ExportToExcel}
                isButtonType={true}
              />
            </ButtonBox>
          </TitleBox>
          <SearchContainer>
            <select
              name="SearchTypeBox"
              defaultValue={ShopListState.SearchOption.SearchSelectBox}
              onChange={(e) => ChangeSearchSelectBox(e)}
            >
              <option value="ShopID" key={0}>
                ShopID
              </option>
              <option value="ShopName" key={1}>
                Shop Name
              </option>
              <option value="PhoneNumber" key={2}>
                PhoneNumber
              </option>
              <option value="Address" key={3}>
                Address
              </option>
              <option value="Tag" key={4}>
                Tag
              </option>
            </select>
            <input
              type="text"
              name="SearchKeywordInput"
              value={ShopListState.SearchOption.SearchKeyWord}
              onChange={ChangeSearchKeyword}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  SearchShopList(e);
                }
              }}
            />
            <SearchButton ClickEvent={SearchShopList} />
          </SearchContainer>
          <Table>
            <thead>
              <tr>
                <th className="CheckBoxCell">
                  <input
                    type="checkbox"
                    onChange={CheckAllCheckBox}
                    checked={AllCheckBoxStatus()}
                  />
                </th>
                <th>
                  <SortText>Shop ID</SortText>
                  <SortButton
                    type={
                      !queryInput.sort_shopid
                        ? 0
                        : Number(queryInput.sort_shopid) === 0
                        ? 1
                        : 2
                    }
                    func={(e) => SortClick(e, "ShopId")}
                  />
                </th>
                <th>
                  <SortText>Shop Name</SortText>
                  <SortButton
                    type={
                      !queryInput.sort_shopname
                        ? 0
                        : Number(queryInput.sort_shopname) === 0
                        ? 1
                        : 2
                    }
                    func={(e) => SortClick(e, "ShopName")}
                  />
                </th>
                <th>PhoneNumber</th>
                <th>Address</th>
                <th>Thumbnail Tags</th>
                <th>
                  <SortText>Rank</SortText>
                  <SortButton
                    type={
                      !queryInput.sort_rank
                        ? 0
                        : Number(queryInput.sort_rank) === 0
                        ? 1
                        : 2
                    }
                    func={(e) => SortClick(e, "Rank")}
                  />
                </th>
                <th>
                  <SortText>Weight</SortText>
                  <SortButton
                    type={
                      !queryInput.sort_weight
                        ? 0
                        : Number(queryInput.sort_weight) === 0
                        ? 1
                        : 2
                    }
                    func={(e) => SortClick(e, "Weight")}
                  />
                </th>
                <th>Posts</th>
                <th>Products</th>
                <th>Likes</th>
                <th>Views</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data.getShopList.shops.map((eachShop) => (
                <ShopDataRow data={eachShop} key={eachShop.shopId} />
              ))}
            </tbody>
          </Table>
          <DeleteButtonBox>
            <Button
              text="Edit Selected"
              name="EditButton"
              ClickEvent={onSubmit}
            ></Button>
            <Button
              text="Delete Selected"
              name="DeleteButton"
              ClickEvent={onSubmit}
            ></Button>
          </DeleteButtonBox>
          <SelectedShopContainer>
            Selected Shop : {ShopListState.SelectedShopList.toString()}
          </SelectedShopContainer>
          <SelectedShopContainer>
            Edited Shop :{" "}
            {ShopListState.WeightData.map((eachData) => eachData.id).toString()}
          </SelectedShopContainer>
        </Form>
        <PaginationWrapper>
          <Pagination
            currentPage={
              isNaN(Number(queryInput.page)) || Number(queryInput.page) <= 0
                ? 1
                : Number(queryInput.page)
            }
            totalSize={data.getShopList.totalShopNum}
            sizePerPage={13}
            theme="bootstrap"
            changeCurrentPage={ChangeCurrentPage}
            numberOfPagesNextToActivePage={3}
          />
        </PaginationWrapper>
      </WrapPage>
    );
  }
};
