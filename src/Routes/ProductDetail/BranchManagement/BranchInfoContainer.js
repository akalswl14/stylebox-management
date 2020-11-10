import React from "react";
import styled from "styled-components";
import SectionTitle from "../../../Components/SectionTitle";
import BranchList from "./BranchList";
import ShopSelectInfo from "./ShopSelectInfo";

const ShopInfoWrapper = styled.div`
  padding: 20px 0px;
`;

export default () => {
  return (
    <>
      <SectionTitle text="Branch Management" />
      <ShopInfoWrapper>
        <ShopSelectInfo />
      </ShopInfoWrapper>
      <BranchList />
    </>
  );
};
