import React from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import Loader from "../../Components/Loader";
import SectionTitle from "../../Components/SectionTitle";
import PageTitle from "../../Components/PageTitle";
import { DashboardBasicStatus } from "./BasicStatus";
import { DashboardTopShop } from "./TopShop";
import { DashboardTopPost } from "./TopPost";

const Wrapper = styled.div`
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export default ({ loading, error, data, setAction }) => {
  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data)
    return (
      <WrapPage>
        <PageTitle text={"DASH BOARD"} />
        <DashboardBasicStatus data={data.getDashboardBasicStatus} />
        <DashboardTopShop data={data.getTopShops} />
        <DashboardTopPost data={data.getTopPosts} setAction={setAction} />
      </WrapPage>
    );
};
