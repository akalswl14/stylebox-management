import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { EventListContext } from "./EventListContainer";
import Button from "../../Components/Button";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import SearchButton from "../../Components/SearchButton";
import EventListTable from "./EventListTable";
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
      let eventInfo = data.getEventManageList.events.map((eachData) => {
        let eventData = {
          eventId: eachData.eventId,
          eventTitle: eachData.eventTitle,
          eventStart: eachData.eventStart,
          eventEnd: eachData.eventEnd,
          isOnList: eachData.isOnList,
          link: eachData.link,
          likesNum: eachData.likesNum,
          viewsNum: eachData.viewsNum,
        };
        return eventData;
      });
      eventDispatch({
        type: "SET_DATA",
        data: {
          eventInfo,
        },
      });
    }, []);

    const { eventDispatch, eventState } = useContext(EventListContext);

    const queryInput = queryString.parse(window.location.search);

    const onChangeCurrentPage = (pageNum) => {
      const changedQuery = queryString.stringify({
        ...queryInput,
        page: pageNum,
      });
      window.location.href = `/eventlist?${changedQuery}`;
    };

    const ChangeSearch = (e) => {
      const { value, name } = e.target;
      eventDispatch({
        type: "UPDATE_SEARCH",
        data: {
          name,
          value,
        },
      });
    };

    const ChangeButton = (buttonKind) => {
      eventDispatch({
        type: "CHANGE_BUTTON",
        data: {
          buttonKind,
        },
      });
    };

    const SearchEventList = (e) => {
      e.preventDefault();
      if (eventState.searchOption.searchSelectBox === "eventId") {
        if (isNaN(eventState.searchOption.searchKeyWord)) {
          toast.error("Id must be a number.");
          return;
        }
      }

      const changedQuery = {
        page: 1,
        id:
          eventState.searchOption.searchSelectBox === "eventId"
            ? eventState.searchOption.searchKeyWord
            : undefined,
        eventtitle:
          eventState.searchOption.searchSelectBox === "eventTitle"
            ? eventState.searchOption.searchKeyWord
            : undefined,
      };

      window.location.href = `/eventlist?${queryString.stringify(
        changedQuery
      )}`;
    };

    const ExportToExcel = (e) => {
      e.preventDefault();
    };

    const refreshQuery = (e) => {
      e.preventDefault();
      window.location.href = "/eventlist";
    };

    return (
      <>
        <WrapPage>
          <PageTitle text={"Event List"} />
          <TitleBox>
            <form>
              <SearchBox>
                <SelectBox
                  name="searchSelectBox"
                  onChange={ChangeSearch}
                  defaultValue={eventState.searchOption.searchSelectBox}
                >
                  <option value="eventId">eventId</option>
                  <option value="eventTitle">eventTitle</option>
                </SelectBox>
                &nbsp;
                <InputBox
                  type="text"
                  name="searchKeyWord"
                  value={eventState.searchOption.searchKeyWord}
                  onChange={ChangeSearch}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      SearchEventList(e);
                    }
                  }}
                />
                &nbsp;
                <SearchButton ClickEvent={SearchEventList} />
              </SearchBox>
            </form>
            <ButtonBox>
              <RefreshButton func={refreshQuery} />
              <PageChangeButton text="Add New Event" href="/createevent" />
              <Button text="Download List" ClickEvent={ExportToExcel}></Button>
            </ButtonBox>
          </TitleBox>
          <form onSubmit={onSubmit}>
            <EventListTable data={data} />
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
              totalSize={data.getEventManageList.totalEventNum}
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
