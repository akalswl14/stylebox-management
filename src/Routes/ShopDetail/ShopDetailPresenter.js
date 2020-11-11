import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import PageTitle from "../../Components/PageTitle";
import WrapPage from "../../Styles/WrapPageStyles";
import Button from "../../Components/Button";
import { ShopInfoContext } from "./ShopDetailContainer";
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
  const { ShopInfoState, ShopInfoDispatch } = useContext(ShopInfoContext);

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
        let cnt = 1,
          updateTagData = [],
          updateLinkData = [],
          updateShopImageData = [],
          updateShopVideoData = [],
          updateBranchData = [];
        for (const eachTag of data.getShopTagInfo) {
          updateTagData.push({
            id: cnt,
            category: eachTag.category ?? "-- CHOOSE DATA --",
            classId: eachTag.classId ?? 0,
            className: eachTag.className ?? "-- CHOOSE DATA --",
            order: cnt,
            tagId: eachTag.tagId,
            tagName: eachTag.tagName ?? "-- CHOOSE DATA --",
          });
          cnt++;
        }
        cnt = 1;
        for (const eachLink of data.getShopExternalLink) {
          updateLinkData.push({
            id: cnt,
            isShown: eachLink.isShown,
            linkType: eachLink.linkType,
            order: eachLink.order,
            url: eachLink.url,
          });
          cnt++;
        }
        cnt = 1;
        for (const eachImage of data.getShopImages) {
          updateShopImageData.push({
            id: cnt,
            order: eachImage.order,
            ImageFile: "",
            ImagePreviewUrl: S3_URL + eachImage.url,
            isNewImage: false,
            s3Key: eachImage.url,
          });
          cnt++;
        }
        cnt = 1;
        for (const eachVideo of data.getShopVideos) {
          updateShopVideoData.push({
            id: cnt,
            order: eachVideo.order,
            url: eachVideo.url,
          });
          cnt++;
        }
        cnt = 1;
        for (const eachBranch of data.getShopToBranch) {
          updateBranchData.push({
            id: cnt,
            BranchId: eachBranch.id,
            BranchName: eachBranch.branchName,
            PhoneNumber: eachBranch.phoneNumber,
            Address: eachBranch.address,
            MapUrl: eachBranch.googleMapUrl,
          });
          cnt++;
        }
        let updateData = {
          BasicInformation: {
            shopId: data.getShopBasicInfo.id,
            shopName: {
              value: data.getShopBasicInfo.shopName,
              isChange: false,
            },
            phoneNumber: {
              value: data.getShopBasicInfo.phoneNumber,
              isChange: false,
            },
            MainAddress: {
              value: data.getShopBasicInfo.mainBranchAddress,
              isChange: false,
            },
            MainMapUrl: {
              value: data.getShopBasicInfo.mainBranchMapUrl,
              isChange: false,
            },
            ShopLogo: {
              File: "",
              PreviewUrl: data.getShopBasicInfo.logoUrl
                ? S3_URL + data.getShopBasicInfo.logoUrl
                : "",
              isChange: false,
              isNewImage: false,
              s3Key: data.getShopBasicInfo.logoUrl ?? null,
            },
          },
          BasicStatus: {
            ShopRank: data.getShopBasicStatus.monthlyRankNum,
            TotalNumberofPosts: data.getShopBasicStatus.postNum,
            TotalLikes: data.getShopBasicStatus.likeNum,
            RegistrationData: data.getShopBasicStatus.RegistrationDate,
            RankingWeight: {
              value: data.getShopBasicStatus.weight,
              isChange: false,
            },
            TotalNumberofProducts: data.getShopBasicStatus.productNum,
            TotalViews: data.getShopBasicStatus.viewNum,
            LastUpdated: data.getShopBasicStatus.UpdateDate,
          },
          TagInformation: { value: updateTagData, isChange: false },
          SocialMediaLink: {
            FacebookLink: {
              value: data.getShopSNSLink.FacebookLink ?? "",
              isChange: false,
            },
            InstagramLink: {
              value: data.getShopSNSLink.InstagramLink ?? "",
              isChange: false,
            },
            YoutubeLink: {
              value: data.getShopSNSLink.YoutubeLink ?? "",
              isChange: false,
            },
          },
          ExternalLink: { value: updateLinkData, isChange: false },
          ShopImagesManagement: { value: updateShopImageData, isChange: false },
          ShopVideoManagement: { value: updateShopVideoData, isChange: false },
          ShopDescription: {
            value: data.getShopDescription ?? "",
            isChange: false,
          },
          BranchManagement: { value: updateBranchData, isChange: false },
          CategoryData: data.getManageCategoryOptions.filter(
            (category) => category !== "ShopName"
          ),
          LinkTypeData: data.getLinkTypeOption,
          DeleteImageList: [],
        };
        ShopInfoDispatch({
          type: "UPDATE_BATCH",
          data: updateData,
        });
      } catch (e) {
        toast.error("Error occured getting data.");
        ShopInfoDispatch({
          type: "UPDATE_BATCH",
          data: { ...ShopInfoState, isDataUpdated: true },
        });
      }
    }, []);

    if (!ShopInfoState.isDataUpdated) {
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
              <TagInformationContainer />
            </SectionWrapper>
            <SectionWrapper>
              <SocialMediaLink />
            </SectionWrapper>
            <SectionWrapper>
              <ExternalLinkContainer />
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
            <ButtonBox>
              <PageChangeButton text="Back to List" href="/shoplist" />
              <Button text="Confirm" ClickEvent={onSubmit} />
            </ButtonBox>
          </Form>
        </WrapPage>
      );
    }
  }
};
