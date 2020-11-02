import React, { useContext } from "react";
import styled from "styled-components";
import PageTitle from "../../Components/PageTitle";
import WrapPage from "../../Styles/WrapPageStyles";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import { UserListContext } from "./UserListContainer";
import UserDataRow from "./UserDataRow";
import SortButton from "../../Components/SortButton";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import SearchButton from "../../Components/SearchButton";

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
  border: 1px solid black;
  width: 100%;
  text-align: center;
  tr,
  td,
  th {
    border: ${(props) => props.theme.tableBorder};
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
  }
  .SortCell {
    justify-content: center;
    border: 0;
  }
`;

const SortText = styled.span`
  line-height: 30px;
`;

const PaginationWrapper = styled.div`
  text-align: center;
  margin: 40px 0px;
`;

const SelectedUserContainer = styled.div`
  font-weight: 500;
  font-size: 17px;
`;

const SearchContainer = styled.div`
  padding-bottom: 20px;
  font-weight: 450;
  select,
  option,
  input {
    font-size: 16px;
  }
  input {
    margin-left: 10px;
  }
`;

export default ({ onSubmit, loading, error, data }) => {
  const { UserListState, UserListDispatch } = useContext(UserListContext);

  const SortClick = (e, name) => {
    e.preventDefault();
    let SortOption = {
      SortUserId: false,
      SortInstallationDate: false,
      userIdAsc: true,
      installationDateAsc: true,
    };
    if (name === "userId") {
      if (UserListState.SortOption.SortUserId) {
        if (UserListState.SortOption.userIdAsc) {
          SortOption.SortUserId = true;
          SortOption.userIdAsc = false;
        } else {
          SortOption.userIdAsc = true;
          SortOption.SortUserId = false;
        }
      } else {
        SortOption.SortUserId = true;
        SortOption.userIdAsc = true;
      }
    } else if (name === "installationDate") {
      if (UserListState.SortOption.SortInstallationDate) {
        if (UserListState.SortOption.installationDateAsc) {
          SortOption.SortInstallationDate = true;
          SortOption.installationDateAsc = false;
        } else {
          SortOption.installationDateAsc = true;
          SortOption.SortInstallationDate = false;
        }
      } else {
        SortOption.SortInstallationDate = true;
        SortOption.installationDateAsc = true;
      }
    }
    UserListDispatch({
      type: "UPDATE_SORTOPTION",
      data: {
        SortOption,
      },
    });
  };

  const ChangeCurrentPage = (pageNum) => {
    UserListDispatch({
      type: "UPDATE_PAGENUM",
      data: {
        pageNum,
      },
    });
  };

  const ChangeSearchSelectBox = (e) => {
    const { value } = e.target;
    UserListDispatch({
      type: "UPDATE_SEARCH_SELECTBOX",
      data: {
        SearchSelectBox: value,
      },
    });
  };

  const ChangeSearchKeyword = (e) => {
    const { value } = e.target;
    UserListDispatch({
      type: "UPDATE_SEARCH_KEYWORD",
      data: {
        SearchKeyWord: value,
      },
    });
  };

  const SearchUserList = (e) => {
    e.preventDefault();
    UserListDispatch({
      type: "UPDATE_SEARCHOPTION",
      data: {
        SearchOption: {
          ...UserListState.SearchOption,
          SearchUserId:
            UserListState.SearchOption.SearchSelectBox === "UserID"
              ? true
              : false,
          userId: Number(UserListState.SearchOption.SearchKeyWord),
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
    const CheckAllCheckBox = (e) => {
      let BatchUserList = UserListState.SelectedUserList;
      if (e.target.checked) {
        for (const eachUser of data.getUserList.users) {
          if (!BatchUserList.includes(eachUser.userId)) {
            BatchUserList.push(eachUser.userId);
          }
        }
      } else {
        for (const eachUser of data.getUserList.users) {
          const index = BatchUserList.indexOf(eachUser.userId);
          if (index > -1) {
            BatchUserList.splice(index, 1);
          }
        }
      }
      UserListDispatch({
        type: "UPDATE_BATCH_SELECTUSER",
        data: { BatchUserList },
      });
    };

    const AllCheckBoxStatus = () => {
      for (const eachUser of data.getUserList.users) {
        if (!UserListState.SelectedUserList.includes(eachUser.userId)) {
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
            <PageTitle text={"User List"} />
            <ButtonBox>
              <Button
                text="Export to Excel"
                ClickEvent={ExportToExcel}
                isButtonType={true}
              ></Button>
            </ButtonBox>
          </TitleBox>
          <SearchContainer>
            <select
              name="SearchTypeBox"
              defaultValue="UserID"
              onChange={(e) => ChangeSearchSelectBox(e)}
            >
              <option value="UserID">UserID</option>
            </select>
            <input
              type="text"
              name="SearchKeywordInput"
              value={UserListState.SearchOption.SearchKeyWord}
              onChange={(e) => ChangeSearchKeyword(e)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  SearchUserList(e);
                }
              }}
            />
            <SearchButton ClickEvent={SearchUserList} />
          </SearchContainer>
          <Table>
            <tr>
              <th className="CheckBoxCell">
                <input
                  type="checkbox"
                  onClick={(e) => CheckAllCheckBox(e)}
                  checked={AllCheckBoxStatus()}
                />
              </th>
              <th>
                <SortText>User ID</SortText>
                <SortButton
                  type={
                    !UserListState.SortOption.SortUserId
                      ? 0
                      : UserListState.SortOption.userIdAsc
                      ? 1
                      : 2
                  }
                  func={(e) => SortClick(e, "userId")}
                />
              </th>

              <th>
                <SortText>Installation Date</SortText>
                <SortButton
                  type={
                    !UserListState.SortOption.SortInstallationDate
                      ? 0
                      : UserListState.SortOption.installationDateAsc
                      ? 1
                      : 2
                  }
                  func={(e) => SortClick(e, "installationDate")}
                />
              </th>
              <th>Total # of Like (Post)</th>
              <th>Total # of Like (Shop)</th>
              <th>Total # of Like (Event)</th>
            </tr>
            {data.getUserList.users.map((eachUser) => (
              <UserDataRow data={eachUser} />
            ))}
          </Table>
          <DeleteButtonBox>
            <Button text="Delete Selected" ClickEvent={onSubmit}></Button>
          </DeleteButtonBox>
          <SelectedUserContainer>
            Selected User : {UserListState.SelectedUserList.toString()}
          </SelectedUserContainer>
        </Form>
        <PaginationWrapper>
          <Pagination
            currentPage={UserListState.pageNum}
            totalSize={data.getUserList.totalUserNum}
            sizePerPage={13}
            theme="bootstrap"
            changeCurrentPage={(e) => ChangeCurrentPage(e)}
            numberOfPagesNextToActivePage={3}
          />
        </PaginationWrapper>
      </WrapPage>
    );
  }
};
