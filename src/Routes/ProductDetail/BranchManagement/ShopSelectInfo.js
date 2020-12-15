import React, { useContext } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../../../Components/Button";
import { ProductInfoContext } from "../ProductDetailContainer";
import AutoSelectBox from "./AutoSelectBox";

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
  .shopIdCell {
    width: 70px;
  }
  .shopLinkCell {
    width: 600px;
  }
`;

const ShopLinkWrapper = styled.div`
  padding: 0px 10px;
  width: 380px;
  display: inline-block;
  height: 20px;
  overflow: auto;
  vertical-align: middle;
  text-align: start;
`;

export default () => {
  const { ProductInfoState, ProductInfoDispatch } = useContext(
    ProductInfoContext
  );

  const CheckLink = () => {
    let InputLink = ProductInfoState.SelectedShop.shopLink;
    try {
      window.open(InputLink, "_blank");
    } catch (e) {
      toast.error("Invalid URL");
    }
  };

  const onShopNameSelect = (e) => {
    if (!e.target.querySelector("li>span")) {
      const value = e.target.value;
      for (const eachShop of ProductInfoState.ShopData) {
        if (eachShop.shopName === value) {
          ProductInfoDispatch({
            type: "UPDATE_BATCH",
            data: {
              ...ProductInfoState,
              SelectedShop: {
                shopId: eachShop.id,
                shopName: value,
                shopLink: eachShop.shopLink,
              },
              BranchManagement: { value: [] },
            },
          });
          return;
        }
      }
      ProductInfoDispatch({
        type: "UPDATE_BATCH",
        data: {
          ...ProductInfoState,
          SelectedShop: { shopId: 0, shopName: value, shopLink: null },
          BranchManagement: { value: [] },
        },
      });
    } else {
      const ShopId = Number(e.target.querySelector("li>span").textContent);
      for (const eachShop of ProductInfoState.ShopData) {
        if (eachShop.id === ShopId) {
          ProductInfoDispatch({
            type: "UPDATE_BATCH",
            data: {
              ...ProductInfoState,
              SelectedShop: {
                shopId: ShopId,
                shopName: eachShop.shopName,
                shopLink: eachShop.shopLink,
              },
              BranchManagement: { value: [] },
            },
          });
          return;
        }
      }
      ProductInfoDispatch({
        type: "UPDATE_BATCH",
        data: {
          ...ProductInfoState,
          SelectedShop: {
            ...ProductInfoState.SelectedShop,
            shopId: 0,
            shopLink: null,
          },
          BranchManagement: { value: [] },
        },
      });
    }
  };

  const onShopNameChange = (e) => {
    const value = e.target.value;
    for (const eachShop of ProductInfoState.ShopData) {
      if (eachShop.shopName === value) {
        ProductInfoDispatch({
          type: "UPDATE_BATCH",
          data: {
            ...ProductInfoState,
            SelectedShop: {
              shopId: eachShop.id,
              shopName: value,
              shopLink: eachShop.shopLink,
            },
            BranchManagement: { value: [] },
          },
        });
        return;
      }
    }
    ProductInfoDispatch({
      type: "UPDATE_BATCH",
      data: {
        ...ProductInfoState,
        SelectedShop: { shopId: 0, shopName: value, shopLink: null },
        BranchManagement: { value: [] },
      },
    });
  };
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th className="shopIdCell">Shop ID</th>
            <th>Shop Name</th>
            <th className="shopLinkCell">Shop externalLink</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="shopIdCell">
              {ProductInfoState.SelectedShop.shopId > 0
                ? ProductInfoState.SelectedShop.shopId
                : "-"}
            </td>
            <td>
              <AutoSelectBox
                defaultValue={{
                  id: ProductInfoState.SelectedShop.shopId,
                  shopName: ProductInfoState.SelectedShop.shopName,
                  shopLink: ProductInfoState.SelectedShop.shopLink,
                  __typename: "ShopOption",
                }}
                data={ProductInfoState.ShopData}
                onChangeFunc={onShopNameChange}
                onSelectFunc={onShopNameSelect}
              />
            </td>
            <td className="shopLinkCell">
              <ShopLinkWrapper>
                {!ProductInfoState.SelectedShop.shopLink ||
                ProductInfoState.SelectedShop.shopLink === ""
                  ? "LINK DOES NOT EXIST"
                  : ProductInfoState.SelectedShop.shopLink}
              </ShopLinkWrapper>
              <Button
                text={"Check"}
                isButtonType={true}
                ClickEvent={CheckLink}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
