import React from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import Loader from "../../Components/Loader";
import PageTitle from "../../Components/PageTitle";
import { MainTagIcon } from "./MainTagIcon";
import { BestTagIcon } from "./BestTagIcon";
import { ShopTagIcon } from "./ShopTagIcon";

const Wrapper = styled.div`
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export default ({
  action,
  setAction,
  loading,
  error,
  data,
  loading_StyleClass,
  error_StyleClass,
  data_StyleClass,
}) => {
  if (error) return `Error! ${error.message}`;
  if (error_StyleClass) return `Error! ${error_StyleClass.message}`;
  if (loading || loading_StyleClass)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data && !loading_StyleClass && data_StyleClass) {
    return (
      <WrapPage>
        <PageTitle text={"Tag Icon Management"} />
        <MainTagIcon
          setAction={setAction}
          data={data.getSettingMainBubbles}
          classData={data_StyleClass.getClassOptions}
        />
        <BestTagIcon
          setAction={setAction}
          data={data.getSettingBestBubbles}
          // categoryData={data.getManageCategoryOptions}
        />
        <ShopTagIcon
          setAction={setAction}
          data={data.getSettingShopBubbles}
          // categoryData={data.getManageCategoryOptions}
        />
      </WrapPage>
    );
  }
};
