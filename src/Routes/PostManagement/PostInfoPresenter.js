import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { PostInfoContext } from "./PostInfoContainer";
import PostBasicInfo from "./PostBasicInfo";
import PostBasicStatus from "./PostBasicStatus";
import TagInformation from "./TagInformation/index";
import ExternalLink from "./ExternalLink/index";
import PostImages from "./PostImages/index";
import PostVideo from "./PostVideo/index";
import PostDescription from "./PostDescription";
import SubProduct from "./SubProduct/index";

const Wrapper = styled.div`
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export default ({
  onSubmit,
  loading,
  data,
  error,
  loading_CategoryData,
  error_CategoryData,
  data_CategoryData,
  loading_LinkTypeData,
  error_LinkTypeData,
  data_LinkTypeData,
}) => {
  if (error) {
    return `Error! ${error.message}`;
  }
  if (error_CategoryData) {
    return `Error! ${error_CategoryData.message}`;
  }
  if (error_LinkTypeData) {
    return `Error! ${error_LinkTypeData.message}`;
  }
  if (loading_CategoryData || loading_LinkTypeData || loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  if (
    !loading &&
    !loading_CategoryData &&
    !loading_LinkTypeData &&
    data &&
    data_CategoryData &&
    data_LinkTypeData
  ) {
    const { postDispatch, postState } = useContext(PostInfoContext);

    const categories = data_CategoryData.getManageCategoryOptions.filter(
      (category) => category !== "ShopName"
    );
    const linkTypes = data_LinkTypeData.getLinkTypeOption;

    useEffect(() => {
      let postDescription = data.getPostDescription;

      let basicStatus = {
        weeklyRank: data.getPostBasicStatus.weeklyRank,
        monthlyRank: data.getPostBasicStatus.monthlyRank,
        totalRank: data.getPostBasicStatus.totalRank,
        priority: data.getPostBasicStatus.priority,
        likesNum: data.getPostBasicStatus.likesNum,
        viewsNum: data.getPostBasicStatus.viewsNum,
        createdAt: data.getPostBasicStatus.createdAt,
        updatedAt: data.getPostBasicStatus.updatedAt,
      };

      let basicInfo = {
        postId: data.getPostBasicInfo.postId,
        mainProductId: data.getPostBasicInfo.mainProductId,
        mainProductName: data.getPostBasicInfo.mainProductName,
        price: data.getPostBasicInfo.price,
        shopId: data.getPostBasicInfo.shopId,
        shopName: data.getPostBasicInfo.shopName,
      };

      let idIdx = 1;
      let tagInfoData = data.getPostTagInfo.map((eachData) => {
        let tagData = {
          id: idIdx,
          order: eachData.order,
          tagId: eachData.tagId,
          tagName: eachData.tagName,
          category: eachData.category,
          className: eachData.className,
          classId: eachData.classId,
        };
        idIdx++;
        return tagData;
      });

      idIdx = 1;
      let externalLink = data.getPostExternalLink.map((eachData) => {
        let linkData = {
          id: idIdx,
          order: eachData.order,
          linkType: eachData.linkType,
          url: eachData.url,
          isShown: eachData.isShown,
        };
        idIdx++;
        return linkData;
      });

      idIdx = 1;
      let postImageManagement = data.getPostImages.map((eachData) => {
        let imageData = {
          id: idIdx,
          order: eachData.order,
          url: eachData.url,
          isImageChange: false,
          imageFile: "",
          imagePreviewUrl: "",
          imageInput: { current: null },
        };
        idIdx++;
        return imageData;
      });

      idIdx = 1;
      let postVideoManagement = data.getPostVideo.map((eachData) => {
        let videoData = {
          id: idIdx,
          order: eachData.order,
          url: eachData.url,
        };
        idIdx++;
        return videoData;
      });

      idIdx = 1;
      let subProductManagement = data.getPostSubProduct.map((eachData) => {
        let subProductData = {
          id: idIdx,
          productId: eachData.productId,
          productName: eachData.productName,
          price: eachData.price,
          link: eachData.link,
          order: eachData.order,
        };
        idIdx++;
        return subProductData;
      });

      postDispatch({
        type: "SET_DATA",
        data: {
          basicStatus,
          basicInfo,
          tagInfoData,
          externalLink,
          postImageManagement,
          postVideoManagement,
          postDescription,
          subProductManagement,
          isDataUpdated: true,
        },
      });
    }, []);

    if (!postState.isDataUpdated) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      );
    } else {
      return (
        <>
          <WrapPage>
            <form onSubmit={onSubmit}>
              <PageTitle text={"Post Management"} />
              <PostBasicInfo />
              <PostBasicStatus />
              <ExternalLink linkTypes={linkTypes} />
              <PostImages />
              <PostVideo />
              <PostDescription />
              <SubProduct />
              <TagInformation categories={categories} />
            </form>
          </WrapPage>
        </>
      );
    }
  }
};
