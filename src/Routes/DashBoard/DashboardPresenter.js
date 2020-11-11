import React from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import Loader from "../../Components/Loader";
import PageTitle from "../../Components/PageTitle";
import { DashboardBasicStatus } from "./BasicStatus";
import { DashboardTopShop } from "./TopShop";
import { DashboardTopPost } from "./TopPost";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export default ({
  loading,
  error,
  data,
  setAction,
  loading_post,
  error_post,
  data_post,
}) => {
  if (error || error_post) return `Error! ${error.message}`;
  if (loading || loading_post)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data && data_post) {
    if (
      !data.getDashboardBasicStatus ||
      !data.getTopShops ||
      !data_post.getTopPosts
    ) {
      toast.error("Error occured getting data.");
      return <WrapPage></WrapPage>;
    } else {
      return (
        <WrapPage>
          <PageTitle text={"DASH BOARD"} />
          <DashboardBasicStatus data={data.getDashboardBasicStatus} />
          <DashboardTopShop data={data.getTopShops} />
          <DashboardTopPost
            data={data_post.getTopPosts}
            setAction={setAction}
          />
        </WrapPage>
      );
    }
  }
};
