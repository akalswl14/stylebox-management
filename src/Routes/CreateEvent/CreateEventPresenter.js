import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import PageTitle from "../../Components/PageTitle";
import WrapPage from "../../Styles/WrapPageStyles";
import Button from "../../Components/Button";
import { EventInfoContext } from "./CreateEventContainer";
import PageChangeButton from "../../Components/PageChangeButton";
import BasicInformation from "./BasicInformation";
import BasicStatus from "./BasicStatus";
import TagInformationContainer from "./TagInformation";
import ThumbnailImage from "./ThumbnailImage";
import MainImageContainer from "./MainImage";
import MainVideoContainer from "./MainVideo";
import DetailImageContainer from "./DetailImage";

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

const SectionWrapper = styled.div`
  padding-bottom: 20px;
`;

const Form = styled.form``;

export default ({ onSubmit, loading, data, error }) => {
  const { EventInfoState, EventInfoDispatch } = useContext(EventInfoContext);

  if (error) {
    return <WrapPage>`Error! ${error.message}`</WrapPage>;
  }
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  if (!loading && data) {
    useEffect(() => {
      let updateData = {
        ...EventInfoState,
        CategoryData: data.getManageCategoryOptions,
      };
      EventInfoDispatch({
        type: "UPDATE_BATCH",
        data: updateData,
      });
    }, []);

    return (
      <WrapPage>
        <Form>
          <TitleBox>
            <PageTitle text={"Event Management"} />
            <ButtonBox>
              <PageChangeButton text="Back to List" href="/eventlist" />
              <Button text="Confirm" ClickEvent={onSubmit} />
            </ButtonBox>
          </TitleBox>
          <SectionWrapper>
            <BasicInformation />
          </SectionWrapper>
          <SectionWrapper>
            <BasicStatus />
          </SectionWrapper>
          <SectionWrapper>
            <TagInformationContainer />
          </SectionWrapper>
          <SectionWrapper>
            <ThumbnailImage />
          </SectionWrapper>
          <SectionWrapper>
            <MainImageContainer />
          </SectionWrapper>
          <SectionWrapper>
            <MainVideoContainer />
          </SectionWrapper>
          <SectionWrapper>
            <DetailImageContainer />
          </SectionWrapper>
        </Form>
      </WrapPage>
    );
  }
};
