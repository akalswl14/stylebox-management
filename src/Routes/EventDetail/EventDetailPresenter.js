import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import PageTitle from "../../Components/PageTitle";
import WrapPage from "../../Styles/WrapPageStyles";
import Button from "../../Components/Button";
import { EventInfoContext } from "./EventDetailContainer";
import PageChangeButton from "../../Components/PageChangeButton";
import BasicInformation from "./BasicInformation";
import BasicStatus from "./BasicStatus";
import TagInformationContainer from "./TagInformation";
import ThumbnailImage from "./ThumbnailImage";
import MainImageContainer from "./MainImage";
import MainVideoContainer from "./MainVideo";
import DetailImageContainer from "./DetailImage";
import { S3_URL } from "../../AWS_IAM";
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
      try {
        let rtnTagList = data.getEventTagInfo.map((eachTag, index) => ({
          ...eachTag,
          id: index + 1,
        }));
        let rtnMainImageList = data.getEventMainImages.map(
          (eachImage, index) => ({
            id: index + 1,
            order: eachImage.order,
            ImageFile: "",
            ImagePreviewUrl: S3_URL + eachImage.url,
            isNewImage: false,
            s3Key: eachImage.url,
          })
        );
        let rtnVideoList = data.getEventMainVideos.map((eachVideo, index) => ({
          ...eachVideo,
          id: index + 1,
        }));
        let rtnDetailImageList = data.getEventDetailImages.map(
          (eachImage, index) => ({
            id: index + 1,
            order: eachImage.order,
            ImageFile: "",
            ImagePreviewUrl: S3_URL + eachImage.url,
            isNewImage: false,
            s3Key: eachImage.url,
          })
        );

        let updateData = {
          BasicInformation: {
            eventId: Number(data.getEventBasicInfo.id),
            isOnList: {
              value: data.getEventBasicInfo.isOnList,
              isChange: false,
            },
            title: { value: data.getEventBasicInfo.title, isChange: false },
            startDate: {
              value: data.getEventBasicInfo.startDate,
              isChange: false,
            },
            endDate: { value: data.getEventBasicInfo.endDate, isChange: false },
            url: { value: data.getEventBasicInfo.url, isChange: false },
          },
          BasicStatus: {
            likesNum: data.getEventBasicStatus.likesNum,
            viewsNum: data.getEventBasicStatus.viewsNum,
            RegistrationDate: data.getEventBasicStatus.createdAt,
            LastUpdated: data.getEventBasicStatus.updatedAt,
          },
          TagInformation: { value: rtnTagList, isChange: false },
          ThumbnailImages: {
            value: {
              id: 1,
              ImageFile: "",
              ImagePreviewUrl: S3_URL + data.getEventThumbnailImage,
              isNewImage: false,
              s3Key: data.getEventThumbnailImage,
            },
            isChange: false,
          },
          MainImages: { value: rtnMainImageList, isChange: false },
          MainVideos: { value: rtnVideoList, isChange: false },
          DetailImages: { value: rtnDetailImageList, isChange: false },
          CategoryData: data.getManageCategoryOptions,
          DeleteImageList: [],
          isDataUpdated: true,
        };
        EventInfoDispatch({
          type: "UPDATE_BATCH",
          data: updateData,
        });
      } catch {
        toast.error("Error occured getting data.");
        EventInfoDispatch({
          type: "UPDATE_BATCH",
          data: { ...EventInfoState, isDataUpdated: true },
        });
      }
    }, []);

    if (!EventInfoState.isDataUpdated) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      );
    } else {
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
  }
};
