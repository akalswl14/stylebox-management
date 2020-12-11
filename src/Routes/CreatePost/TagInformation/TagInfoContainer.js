import React, { useContext } from "react";
import styled from "styled-components";
import { PlusIcon } from "../../../Components/Icons";
import SectionTitle from "../../../Components/SectionTitle";
import { PostInfoContext } from "../PostInfoContainer";
import TagInfoTable from "./TagInfoTable";
import { toast } from "react-toastify";
import Button from "../../../Components/Button";
import { GET_PRODUCT_TAG } from "../PostInfoQueries";
import { useMutation } from "react-apollo-hooks";

const Table = styled.table`
  font-size: 15px;
  tr {
    height: 40px;
  }
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
    border-bottom: 0.5px solid black;
  }
  td:first-child,
  th:first-child {
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
    width: 10%;
  }
  th:last-child {
    width: 10%;
  }
  tbody > tr:nth-child(2n) {
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
  }
`;

const TitleBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
`;

export default ({ categories }) => {
  const { postState, postDispatch } = useContext(PostInfoContext);
  const [getProductTag, { error: getError }] = useMutation(GET_PRODUCT_TAG);

  const handleTagClick = async (e) => {
    e.preventDefault();
    if (!postState.basicInfo.mainProductId) {
      toast.info("Please select the main product.");
      return;
    }

    let productIds = [];
    productIds.push(postState.basicInfo.mainProductId);
    for (const product of postState.subProductManagement) {
      productIds.push(product.productId);
    }

    const {
      data: { getSubProductTag },
    } = await getProductTag({
      variables: {
        lang: "VI",
        productIds,
      },
    });

    if (!getSubProductTag || getError) {
      toast.error("Error occured while get data.");
      return;
    }

    let idIdx = 1;
    let tagInfoData = getSubProductTag.map((eachData) => {
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

    postDispatch({
      type: "SET_PRODUCT_TAG",
      data: { tagInfoData },
    });
  };

  const addRow = (e) => {
    e.preventDefault();
    const PrevMainRowData = postState.tagInfoData;
    if (PrevMainRowData.length >= 20) {
      toast.error("Up to 20 is possible.");
      return;
    }
    const newData = {
      id:
        PrevMainRowData.length > 0
          ? PrevMainRowData[PrevMainRowData.length - 1].id + 1
          : 1,
      order: PrevMainRowData.length + 1,
      category: "-- CHOOSE DATA --",
      classId: 0,
      className: "-- CHOOSE DATA --",
      tagId: 0,
      tagName: "-- CHOOSE DATA --",
    };
    postDispatch({
      type: "CREATE_TAG",
      data: newData,
    });
  };

  return (
    <>
      <TitleBox>
        <SectionTitle text={"Tag Information"} />
        <Button
          text={"Get Tag"}
          isButtonType={true}
          ClickEvent={handleTagClick}
        ></Button>
      </TitleBox>
      <Table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Tag Type</th>
            <th>Class</th>
            <th>Tag</th>
            <th>
              <RowButton onClick={(e) => addRow(e)}>
                <PlusIcon size={19} />
              </RowButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {postState.tagInfoData.map((postTag) => (
            <TagInfoTable
              key={postTag.id}
              categories={categories}
              data={postTag}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
