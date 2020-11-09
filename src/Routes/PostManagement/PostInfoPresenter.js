import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { PostInfoContext } from "./PostInfoContainer";
import PostBasicInfo from "./PostBasicInfo";
import PostBasicStatus from "./PostBasicStatus";
import TagInformation from "./TagInformation/index";

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

export default ({
  //   loading,
  //   data,
  //   error,
  loading_CategoryData,
  error_CategoryData,
  data_CategoryData,
  loading_LinkTypeData,
  error_LinkTypeData,
  data_LinkTypeData,
}) => {
  const { postDispatch, postState } = useContext(PostInfoContext);

  //   if (error) {
  //     return `Error! ${error.message}`;
  //   }
  if (error_CategoryData) {
    return `Error! ${error_CategoryData.message}`;
  }
  if (error_LinkTypeData) {
    return `Error! ${error_LinkTypeData.message}`;
  }
  if (loading_CategoryData || loading_LinkTypeData) {
    //loading
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  if (
    // !loading &&
    !loading_CategoryData &&
    !loading_LinkTypeData &&
    // data &&
    data_CategoryData &&
    data_LinkTypeData
  ) {
    const categories = data_CategoryData.getManageCategoryOptions.filter(
      (category) => category !== "ShopName"
    );
    const linkTypes = data_LinkTypeData.getLinkTypeOption;

    // useEffect(() => {
    //   let basicInfo = {
    //     postId: data.getPostBasicInfo.postId,
    //     mainProductId: data.getPostBasicInfo.mainProductId,
    //     mainProductName: data.getPostBasicInfo.mainProductName,
    //     price: data.getPostBasicInfo.price,
    //     shopId: data.getPostBasicInfo.shopId,
    //     shopName: data.getPostBasicInfo.shopName,
    //   };
    //   postDispatch({
    //     type: "SET_DATA",
    //     data: { basicInfo },
    //   });
    // }, []);
    return (
      <>
        <WrapPage>
          <form>
            <PageTitle text={"Post Management"} />
            <PostBasicInfo />
            <PostBasicStatus />
            <TagInformation categories={categories} />
          </form>
        </WrapPage>
      </>
    );
  }
};
