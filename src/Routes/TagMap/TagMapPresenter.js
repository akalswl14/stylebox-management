import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import WrapPage from "../../Styles/WrapPageStyles";
import PageTitle from "../../Components/PageTitle";
import Loader from "../../Components/Loader";
import { TagMapContext } from "./TagMapContainer";
import Tags from "./Tags";

const Wrapper = styled.div`
  min-height: 25vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export default ({ loading, data, error }) => {
  if (error) return `Error! ${error.message}`;
  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  if (!loading && data) {
    const { tagDispatch } = useContext(TagMapContext);

    useEffect(() => {
      let LocationTagData = data.getLocationTagList.map((eachData) => {
        let tagData = {
          classId: eachData.classId,
          className: eachData.className,
          tags: eachData.tags,
        };
        return tagData;
      });
      let StyleTagData = data.getStyleTagList.map((eachData) => {
        let tagData = {
          classId: eachData.classId,
          className: eachData.className,
          tags: eachData.tags,
        };
        return tagData;
      });
      let ProductClassTagData = data.getProductClassTagList.map((eachData) => {
        let tagData = {
          classId: eachData.classId,
          className: eachData.className,
          tags: eachData.tags,
        };
        return tagData;
      });
      let FeatureTagData = data.getFeatureTagList.map((eachData) => {
        let tagData = {
          classId: eachData.classId,
          className: eachData.className,
          tags: eachData.tags,
        };
        return tagData;
      });
      let PriceTagData = data.getPriceTagList.map((eachData) => {
        let tagData = {
          classId: eachData.classId,
          className: eachData.className,
          tags: eachData.tags,
        };
        return tagData;
      });
      tagDispatch({
        type: "SET_DATA",
        data: {
          LocationTagData,
          StyleTagData,
          ProductClassTagData,
          FeatureTagData,
          PriceTagData,
        },
      });
    }, []);

    return (
      <>
        <WrapPage>
          <PageTitle text={"Tag Map"} />
          <Tags />
        </WrapPage>
      </>
    );
  }
};
