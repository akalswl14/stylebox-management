import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import SectionTitle from "../../Components/SectionTitle";
import PageChangeButton from "../../Components/PageChangeButton";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import SearchTagTable from "./SearchTagTable";
import { PlusIcon } from "../../Components/Icons";
import { SearchTagIconContext } from "./SearchTagContainer";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    border-bottom: 0.5px solid black;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:first-child,
  th:first-child {
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
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

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

const Form = styled.form``;

export default ({ loading, data, error, onSubmit }) => {
  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    const { searchTagDispatch, searchTagState } = useContext(
      SearchTagIconContext
    );

    useEffect(() => {
      if (!data.getSettingPopularTags) {
        searchTagDispatch({
          type: "SET_DATA",
          data: {
            SearchTagRowData: [],
            isData: false,
          },
        });
      } else {
        let idIdx = 1;
        let SearchTagRowData = data.getSettingPopularTags.map((eachData) => {
          let tagData = {
            id: idIdx,
            order: idIdx,
            tagId: eachData.id,
            tagName: eachData.tagName,
            category: eachData.category,
            className: eachData.className,
            classId: eachData.classId,
          };
          idIdx++;
          return tagData;
        });
        searchTagDispatch({
          type: "SET_DATA",
          data: { SearchTagRowData, isData: true },
        });
      }
    }, []);

    const addRow = (e) => {
      e.preventDefault();
      const PrevMainRowData = searchTagState.SearchTagRowData;
      if (PrevMainRowData.length >= 30) {
        toast.error("Up to 30 is possible.");
        return;
      }
      const newData = {
        id:
          PrevMainRowData.length > 0
            ? PrevMainRowData[PrevMainRowData.length - 1].id + 1
            : 1,
        order:
          PrevMainRowData.length > 0
            ? PrevMainRowData[PrevMainRowData.length - 1].id + 1
            : 1,
        category: "-- CHOOSE DATA --",
        classId: 0,
        className: "-- CHOOSE DATA --",
        tagId: 0,
        tagName: "-- CHOOSE DATA --",
      };
      searchTagDispatch({
        type: "CREATE_TAG",
        data: newData,
      });
    };

    const categories = data.getManageCategoryOptions.filter(
      (category) => category !== "ShopName"
    );

    return (
      <>
        <WrapPage>
          <Form onSubmit={onSubmit}>
            <PageTitle text={"Recommendation Tag Management"} />
            <TitleBox>
              <SectionTitle text={"Recommendation Tag Management"} />
              <ButtonBox>
                <PageChangeButton text="Back To Main" href="/" />
                <Button type="submit" text="Confirm"></Button>
              </ButtonBox>
            </TitleBox>
            <Table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Tag Type</th>
                  <th>Class</th>
                  <th>Tag</th>
                  <th>
                    <RowButton onClick={(e) => addRow(e)}>
                      <PlusIcon size={19} />
                    </RowButton>
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchTagState.isData &&
                  searchTagState.SearchTagRowData.map((searchTag) => (
                    <SearchTagTable
                      key={searchTag.id}
                      categories={categories}
                      data={searchTag}
                    />
                  ))}
              </tbody>
            </Table>
          </Form>
        </WrapPage>
      </>
    );
  }
};
