import React from "react";
import styled from "styled-components";
import SectionTitle from "../../Components/SectionTitle";
import Button from "../../Components/Button";
import LinkButton from "../../Components/LinkButton";

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid lightgrey;
  width: 100%;
  text-align: center;
  td {
    width : 12.5%
    padding: 5px;
    vertical-align: middle;
  }
  .orderInputCell,
  .buttonCell {
    width: 90px;
  }
  td:first-child {
    padding: 8px;
    width: 12.5%;
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
  justify-content: center;
`;

const ShopRank = ({
  feedState,
  onChange,
  onShopResetPriority,
  onShopReset,
}) => {
  return (
    <>
      <TitleBox>
        <SectionTitle text={"Shop Rank Algorithm"} />
      </TitleBox>
      <Table>
        <tbody>
          <tr>
            <td>From</td>
            <td> (ax+by+cz)/t+d </td>
            <td> *d: set d value at individual shop </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Weight of Constants</td>
            <td>
              <span>
                a ={" "}
                <input
                  name="shopConstA"
                  type="text"
                  value={feedState.shopConstA}
                  onChange={onChange}
                />
              </span>
            </td>
            <td>
              <span>
                b ={" "}
                <input
                  name="shopConstB"
                  type="text"
                  value={feedState.shopConstB}
                  onChange={onChange}
                />
              </span>
            </td>
            <td>
              <span>
                c ={" "}
                <input
                  name="shopConstC"
                  type="text"
                  value={feedState.shopConstC}
                  onChange={onChange}
                />
              </span>
            </td>
            <td>
              <ButtonBox onClick={onShopReset}>
                <Button text="Reset All"></Button>
              </ButtonBox>
            </td>
            <td>
              <LinkButton
                href={"/shoplist"}
                text={"Go to Shop List"}
              ></LinkButton>
            </td>
            <td>
              <ButtonBox onClick={onShopResetPriority}>
                <Button text="Reset d"></Button>
              </ButtonBox>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ShopRank;
