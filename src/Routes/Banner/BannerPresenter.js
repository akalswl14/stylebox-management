import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import PageTitle from "../../Components/PageTitle";
import SectionTitle from "../../Components/SectionTitle";
import { PlusIcon } from "../../Components/Icons";
import WrapPage from "../../Styles/WrapPageStyles";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import { BannerContext } from "./BannerContainer";
import BannerDataRow from "./BannerDataRow";
import { toast } from "react-toastify";

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

const Form = styled.form``;

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

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

export default ({ onSubmit, loading, error, data }) => {
  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    const { BannerState, BannerDispatch } = useContext(BannerContext);

    useEffect(() => {
      try {
        let idIdx = 1;
        let BannerData = data.getSettingEventBanner.map((eachData) => {
          let eachBannerData = {
            id: idIdx,
            order: idIdx,
            title: eachData.title,
            eventId: eachData.eventId,
            bannerImage: eachData.bannerImage,
          };
          idIdx++;
          return eachBannerData;
        });
        BannerDispatch({
          type: "SET_DATA",
          data: {
            BannerData,
            isDataUpdated: true,
          },
        });
      } catch (e) {
        toast.error("Error occured getting data.");
        BannerDispatch({
          type: "SET_DATA",
          data: {
            BannerData: [],
            isDataUpdated: true,
          },
        });
      }
    }, []);

    const addRow = (e) => {
      e.preventDefault();
      const PrevData = BannerState.BannerData;
      const newData = {
        id: PrevData.length > 0 ? PrevData[PrevData.length - 1].id + 1 : 1,
        order: PrevData.length > 0 ? PrevData[PrevData.length - 1].id + 1 : 1,
        title: "",
        eventId: null,
        bannerImage: null,
      };
      BannerDispatch({
        type: "CREATE_BANNER",
        data: newData,
      });
    };

    if (!BannerState.isDataUpdated) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      );
    } else {
      return (
        <WrapPage>
          <Form onSubmit={onSubmit}>
            <TitleBox>
              <PageTitle text={"Banner Management"} />
              <ButtonBox>
                <Button text="Confirm"></Button>
              </ButtonBox>
            </TitleBox>
            <SectionTitle text={"Event Banner Management ( in Main Page )"} />
            <Table>
              <thead>
                <tr>
                  <th className="orderInputCell">Order</th>
                  <th>Event ID</th>
                  <th>Event Title</th>
                  <th>Image Thumbnail</th>
                  <th>Enlarge Image</th>
                  <th className="buttonCell">
                    <RowButton onClick={(e) => addRow(e)}>
                      <PlusIcon size={19} />
                    </RowButton>
                  </th>
                </tr>
              </thead>
              <tbody>
                {BannerState.BannerData.map((eachRow, index) => (
                  <BannerDataRow data={eachRow} key={index} />
                ))}
              </tbody>
            </Table>
          </Form>
        </WrapPage>
      );
    }
  }
};
