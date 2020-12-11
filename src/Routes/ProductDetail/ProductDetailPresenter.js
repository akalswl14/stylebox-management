import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import PageTitle from "../../Components/PageTitle";
import WrapPage from "../../Styles/WrapPageStyles";
import Button from "../../Components/Button";
import { ProductInfoContext } from "./ProductDetailContainer";
import PageChangeButton from "../../Components/PageChangeButton";
import BasicInformation from "./BasicInformation";
import BasicStatus from "./BasicStatus";
import TagInformationContainer from "./TagInformation";
import BranchInfoContainer from "./BranchManagement";
import ProductDescription from "./ProductDescription";
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

export default ({
  onSubmit,
  loading,
  data,
  error,
  tagMutation,
  tagMutationError,
  tagMutationLoading,
}) => {
  const { ProductInfoState, ProductInfoDispatch } = useContext(
    ProductInfoContext
  );

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
        let rtnBranches = [],
          rtnTags = [];
        for (const eachBranch of data.getProductSellingShopBranch.branches) {
          if (eachBranch.isSelected) rtnBranches.push(eachBranch.id);
        }
        rtnTags = data.getProductTagInfo.map((eachTag, index) => ({
          ...eachTag,
          id: index + 1,
        }));
        let updateData = {
          BasicInformation: {
            productId: data.getProductBasicInfo.productId,
            productName: {
              value: data.getProductBasicInfo.productName,
              isChange: false,
            },
            price: { value: data.getProductBasicInfo.price, isChange: false },
            externalLink: {
              value: data.getProductBasicInfo.externalLink,
              isChange: false,
            },
            productImage: {
              File: "",
              PreviewUrl:
                data.getProductBasicInfo.productImage &&
                data.getProductBasicInfo.productImage.length > 0
                  ? S3_URL + data.getProductBasicInfo.productImage
                  : "",
              isChange: false,
              s3Key: data.getProductBasicInfo.productImage ?? null,
            },
          },
          BasicStatus: {
            TotalNumberofPosts: data.getProductBasicStatus.postNum,
            RegistrationData: data.getProductBasicStatus.createdAt,
            LastUpdated: data.getProductBasicStatus.updatedAt,
          },
          TagInformation: { value: rtnTags, isChange: false },
          ProductDescription: {
            value: data.getProductDescription ?? "",
            isChange: false,
          },
          SelectedShop: {
            shopId: data.getProductSellingShopBranch.id,
            shopName: data.getProductSellingShopBranch.shopName,
            shopLink: data.getProductSellingShopBranch.shopLink,
          },
          BranchManagement: {
            value: rtnBranches,
            isChange: false,
          },
          ShopData: data.getShopOption,
          CategoryData: data.getManageCategoryOptions.filter(
            (category) => category !== "ShopName"
          ),
          DeleteImageKey: null,
          isDataUpdated: true,
        };
        ProductInfoDispatch({
          type: "UPDATE_BATCH",
          data: updateData,
        });
      } catch {
        toast.error("Error occured getting data.");
        ProductInfoDispatch({
          type: "UPDATE_BATCH",
          data: { ...ProductInfoState, isDataUpdated: true },
        });
      }
    }, []);
    if (ProductInfoState.isDataUpdated === false) {
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
              <PageTitle text={"Product Management"} />
              <ButtonBox>
                <PageChangeButton text="Back to List" href="/productlist" />
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
              <TagInformationContainer
                tagMutation={tagMutation}
                tagMutationError={tagMutationError}
                tagMutationLoading={tagMutationLoading}
              />
            </SectionWrapper>
            <SectionWrapper>
              <BranchInfoContainer />
            </SectionWrapper>
            <SectionWrapper>
              <ProductDescription />
            </SectionWrapper>
          </Form>
        </WrapPage>
      );
    }
  }
};
