import React, { useContext } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import PageTitle from "../../Components/PageTitle";
import WrapPage from "../../Styles/WrapPageStyles";
import Button from "../../Components/Button";
import { ShopInfoContext } from "./CreateShopContainer";
import PageChangeButton from "../../Components/PageChangeButton";
import BasicInformation from "./BasicInformation";
import BasicStatus from "./BasicStatus";
import TagInformationContainer from "./TagInformation";
import SocialMediaLink from "./SocialMediaLink";
import ExternalLinkContainer from "./ExternalLink";
import ShopImageContainer from "./ShopImage";
import ShopVideoContainer from "./ShopVideo";
import ShopDescription from "./ShopDescription";
import BranchInfoContainer from "./BranchManagement";

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

export default ({
  onSubmit,
  loading_CategoryData,
  error_CategoryData,
  data_CategoryData,
  loading_LinkTypeData,
  error_LinkTypeData,
  data_LinkTypeData,
}) => {
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

  if (error_CategoryData) {
    return `Error! ${error_CategoryData.message}`;
  }
  if (error_LinkTypeData) {
    return `Error! ${error_LinkTypeData.message}`;
  }
  if (loading_CategoryData || loading_LinkTypeData) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  if (
    !loading_CategoryData &&
    !loading_LinkTypeData &&
    data_CategoryData &&
    data_LinkTypeData
  ) {
    const categories = data_CategoryData.getManageCategoryOptions.filter(
      (category) => category !== "ShopName"
    );
    const linkTypes = data_LinkTypeData.getLinkTypeOption;
    return (
      <WrapPage>
        <Form>
          <TitleBox>
            <PageTitle text={"Shop Management"} />
            <ButtonBox>
              <PageChangeButton text="Back to List" href="/shoplist" />
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
            <TagInformationContainer categories={categories} />
          </SectionWrapper>
          <SectionWrapper>
            <SocialMediaLink />
          </SectionWrapper>
          <SectionWrapper>
            <ExternalLinkContainer linkTypes={linkTypes} />
          </SectionWrapper>
          <SectionWrapper>
            <ShopImageContainer />
          </SectionWrapper>
          <SectionWrapper>
            <ShopVideoContainer />
          </SectionWrapper>
          <SectionWrapper>
            <ShopDescription />
          </SectionWrapper>
          <SectionWrapper>
            <BranchInfoContainer />
          </SectionWrapper>
        </Form>
      </WrapPage>
    );
  }
};
