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
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  .tagNameCell {
    display: flex;
    justify-content: space-around;
    border: 0;
  }
  .NumCell {
    padding: 7px 0px;
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
        },
      });
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
            {BannerState.BannerData.map((eachRow) => (
              <BannerDataRow data={eachRow} />
            ))}
          </Table>
        </Form>
      </WrapPage>
    );
  }
};
