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
  loading_CategoryData,
  error_CategoryData,
  data_CategoryData,
  loading_LinkTypeData,
  error_LinkTypeData,
  data_LinkTypeData,
}) => {
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
      <>
        <WrapPage>
          <form onSubmit={onSubmit}>
            <PageTitle text={"Post Management"} />
            <PostBasicInfo />
            <PostBasicStatus />
            <TagInformation categories={categories} />
            <ExternalLink linkTypes={linkTypes} />
            <PostImages />
            <PostVideo />
            <PostDescription />
            <SubProduct />
          </form>
        </WrapPage>
      </>
    );
  }
};
