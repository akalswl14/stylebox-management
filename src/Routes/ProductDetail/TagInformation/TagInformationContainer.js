import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../../Components/Button";
import { PlusIcon } from "../../../Components/Icons";
import MiniLoader from "../../../Components/MiniLoader";
import SectionTitle from "../../../Components/SectionTitle";
import { ProductInfoContext } from "../ProductDetailContainer";
import TagDataRow from "./TagDataRow";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  font-size: 15px;
  tr {
    height: 40px;
  }
  tr,
  td,
  th {
    border: ${(props) => props.theme.tableBorder};
  }
  td,
  th {
    padding: 5px;
    vertical-align: middle;
  }
  th {
    background-color: #f2f2f2;
    font-weight: 500;
  }
  .smallerCell {
    width: 400px;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
`;

const RowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  min-width: fit-content;
  margin: 0;
`;

const SectionContainer = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

export default ({ tagMutation, tagMutationError, tagMutationLoading }) => {
  const { ProductInfoState, ProductInfoDispatch } = useContext(
    ProductInfoContext
  );

  const addRow = (e) => {
    e.preventDefault();
    let PrevTagData = ProductInfoState.TagInformation.value;
    const newData = {
      id:
        PrevTagData.length > 0 ? PrevTagData[PrevTagData.length - 1].id + 1 : 1,
      order:
        PrevTagData.length > 0 ? PrevTagData[PrevTagData.length - 1].id + 1 : 1,
      category: "-- CHOOSE DATA --",
      classId: 0,
      className: "-- CHOOSE DATA --",
      tagId: 0,
      tagName: "-- CHOOSE DATA --",
    };
    PrevTagData.push(newData);
    ProductInfoDispatch({
      type: "UPDATE_TAGINFO",
      data: {
        TagInformation: { value: PrevTagData, isChange: true },
      },
    });
  };

  const handleTagUpdate = async (e) => {
    e.preventDefault();
    if (ProductInfoState.SelectedShop.shopId <= 0) {
      toast.error("Please select Shop first.");
      return;
    }
    const tagIds = ProductInfoState.TagInformation.value.map(
      (eachData) => eachData.tagId
    );
    const {
      data: { getTagsbyShop },
    } = await tagMutation({
      variables: {
        shopId: ProductInfoState.SelectedShop.shopId,
        tags: tagIds,
      },
    });
    if (!getTagsbyShop || tagMutationError) {
      toast.error("Error occured while get tag data.");
      return;
    }
    if (getTagsbyShop) {
      try {
        ProductInfoDispatch({
          type: "UPDATE_TAGINFO",
          data: {
            TagInformation: {
              value: getTagsbyShop.map((eachData) => ({
                ...eachData,
                id: eachData.order,
              })),
              isChange: true,
            },
          },
        });
        return;
      } catch (e) {
        toast.error("Error occured while get tag data.");
        return;
      }
    }
    return;
  };

  return (
    <>
      <SectionContainer>
        <SectionTitle text="Tag Information" />
        {tagMutationLoading ? <MiniLoader /> : <></>}
        <Button text="Get ShopTag" ClickEvent={handleTagUpdate} />
      </SectionContainer>
      <Table>
        <thead>
          <tr>
            <th className="orderInputCell">No</th>
            <th>Tag Type</th>
            <th>Class</th>
            <th>Tag</th>
            <th className="buttonCell">
              <RowButton onClick={(e) => addRow(e)}>
                <PlusIcon size={19} />
              </RowButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {ProductInfoState.TagInformation.value.map((eachRow) => (
            <TagDataRow data={eachRow} />
          ))}
        </tbody>
      </Table>
    </>
  );
};
