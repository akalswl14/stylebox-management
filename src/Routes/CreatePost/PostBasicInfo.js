import React, { useContext } from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import { PostInfoContext } from "./PostInfoContainer";
import Button from "../../Components/Button";
import { toast } from "react-toastify";
import AutoSelectBox from "./AutoSelectBox";
import { useQuery } from "react-apollo-hooks";
import { GET_BASICINFO } from "./PostInfoQueries";
import PageChangeButton from "../../Components/PageChangeButton";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td {
    padding: 10px;
    vertical-align: middle;
    width: 25%;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:nth-child(odd) {
    width: 15%;
    background-color: #f2f2f2;
    border-right: 0.5px solid black;
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

const ButtonBox = styled.div`
  padding: 15px 0px 15px 0px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const PostBasicInfo = () => {
  const { postDispatch, postState } = useContext(PostInfoContext);

  const {
    mainProductId,
    mainProductName,
    price,
    shopId,
    shopName,
  } = postState.basicInfo;

  const {
    loading: loading_Shop,
    data: data_Shop,
    error: error_Shop,
  } = useQuery(GET_BASICINFO, {
    variables: { productName: "" },
  });

  if (error_Shop) toast.error("Error Occured while Searching products.");

  return (
    <>
      <TitleBox>
        <SectionTitle text={"Basic Information"} />
        <ButtonBox>
          <PageChangeButton text="Back to List" href="/postlist" />
          <PageChangeButton text="Back to Main" href="/" />
          <Button type="submit" text="Confirm"></Button>
        </ButtonBox>
      </TitleBox>
      <Table>
        <tbody>
          <tr>
            <td>Main ProductId</td>
            <td>{mainProductId} </td>
            <td>Main ProductName</td>
            <td>
              <AutoSelectBox
                value={{
                  productId: mainProductId,
                  productName: mainProductName,
                  shopId,
                  shopName,
                  price,
                }}
                data={data_Shop ? data_Shop.getShopByProductName : []}
                onChangeFunc={(e, newInputValue) => {
                  postDispatch({
                    type: "CHANGE_BASICINFO",
                    data: {
                      mainProductId: newInputValue
                        ? newInputValue.productId
                        : 0,
                      mainProductName: newInputValue
                        ? newInputValue.productName
                        : "",
                      price: newInputValue ? newInputValue.price : 0,
                      shopId: newInputValue ? newInputValue.shopId : 0,
                      shopName: newInputValue ? newInputValue.shopName : "",
                    },
                  });
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Selling Shop</td>
            <td>
              {shopId} {shopName}
            </td>
            <td>Price</td>
            <td>{price} VND</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PostBasicInfo;
