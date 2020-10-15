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

export default ({ action, setAction }) => {
  return (
    <WrapPage>
      <PageTitle text={"Tag Icon Management"} />
      <MainTagIcon setAction={setAction} />
      <BestTagIcon setAction={setAction} />
      <ShopTagIcon setAction={setAction} />
    </WrapPage>
  );
};
