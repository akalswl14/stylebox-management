import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import Loader from "../../Components/Loader";
import PageTitle from "../../Components/PageTitle";
import Button from "../../Components/Button";
import { MainTagIcon } from "./MainTagIcon";
import { BestTagIcon } from "./BestTagIcon";
import { ShopTagIcon } from "./ShopTagIcon";
import { TagIconContext } from "./TagIconContainer";
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

const SectionWrapper = styled.div`
  padding-bottom: 20px;
`;

const Form = styled.form``;

export default ({
  onSubmit,
  loading,
  error,
  data,
  loading_CategoryData,
  error_CategoryData,
  data_CategoryData,
}) => {
  if (error) return `Error! ${error.message}`;
  if (error_CategoryData) return `Error! ${error_CategoryData.message}`;
  if (loading || loading_CategoryData)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data && !loading_CategoryData && data_CategoryData) {
    const { TagIconState, TagIconDispatch } = useContext(TagIconContext);
    useEffect(() => {
      try {
        let idIdx = 1;
        let MainIconRowData = data.getSettingMainBubbles.map((eachData) => {
          let tagData = {
            id: idIdx,
            order: idIdx,
            category: eachData.category,
            classId: eachData.classId,
            className: eachData.className,
            tagId: eachData.tagId,
            tagName: eachData.tagName,
          };
          idIdx++;
          return tagData;
        });
        idIdx = 1;
        let BestIconRowData = data.getSettingBestBubbles.map((eachData) => {
          let tagData = {
            id: idIdx,
            order: idIdx,
            category: eachData.category,
            classId: eachData.classId,
            className: eachData.className,
            tagId: eachData.tagId,
            tagName: eachData.tagName,
          };
          idIdx++;
          return tagData;
        });
        idIdx = 1;
        let ShopIconRowData = data.getSettingShopBubbles.map((eachData) => {
          let tagData = {
            id: idIdx,
            order: idIdx,
            category: eachData.category,
            classId: eachData.classId,
            className: eachData.className,
            tagId: eachData.tagId,
            tagName: eachData.tagName,
          };
          idIdx++;
          return tagData;
        });
        TagIconDispatch({
          type: "SET_DATA",
          data: {
            MainIconRowData,
            BestIconRowData,
            ShopIconRowData,
            isDataUpdated: true,
          },
        });
      } catch {
        toast.error("Error occured getting data.");
        TagIconDispatch({
          type: "SET_DATA",
          data: {
            ...TagIconState,
            isDataUpdated: true,
          },
        });
      }
    }, []);
    const categories = data_CategoryData.getManageCategoryOptions.filter(
      (category) =>
        category !== "ShopName" &&
        category !== "Feature" &&
        category !== "Location" &&
        category !== "Price"
    );
    if (!TagIconState.isDataUpdated) {
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
              <PageTitle text={"Tag Icon Management"} />
              <ButtonBox>
                <Button text="Confirm"></Button>
              </ButtonBox>
            </TitleBox>
            <SectionWrapper>
              <MainTagIcon categories={["Style","ProductClass"]} />
            </SectionWrapper>
            <SectionWrapper>
              <BestTagIcon categories={["ProductClass"]} />
            </SectionWrapper>
            <SectionWrapper>
              <ShopTagIcon categories={categories} />
            </SectionWrapper>
          </Form>
        </WrapPage>
      );
    }
  }
};
